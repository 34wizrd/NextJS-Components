import React, { useState, useMemo, FC } from "react";
import {
  Box,
  Checkbox,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

interface MenuItem {
  id: number;
  label: string;
  parentId: number | null;
  children?: MenuItem[];
  status: number; // 0: unchecked, 1: checked
}

interface NestedMenuItemProps {
  item: MenuItem;
  onSelect: (item: MenuItem, isSelected: boolean) => void;
  depth: number;
  isSelected: (id: number) => boolean;
}

const menuItems: MenuItem[] = [
  { id: 1, label: "Menu Item 1", parentId: null, status: 1 },
  { id: 2, label: "Submenu Item 1", parentId: 1, status: 1 },
  { id: 3, label: "Submenu Item 2", parentId: 1, status: 1 },
  { id: 4, label: "Menu Item 2", parentId: null, status: 1 },
  { id: 5, label: "Submenu Item 3", parentId: 4, status: 1 },
  { id: 6, label: "Sub-submenu Item 1", parentId: 5, status: 1 },
  { id: 7, label: "Sub-submenu Item 2", parentId: 5, status: 0 },
];

const buildMenuTree = (
  items: MenuItem[],
  parentId: number | null = null
): MenuItem[] =>
  items
    .filter((item) => item.parentId === parentId)
    .map((item) => ({
      ...item,
      children: buildMenuTree(items, item.id),
    }));

const NestedMenuItem: FC<NestedMenuItemProps> = ({
  item,
  onSelect,
  depth,
  isSelected,
}) => {
  const [open, setOpen] = useState(false);

  const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setOpen(!open);
  };

  const handleSelectItem = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: MenuItem
  ) => {
    onSelect(item, event.target.checked);
  };

  return (
    <Box
      sx={{
        paddingX: 2,
      }}
    >
      <ListItem
        sx={{
          pl: depth + 1 * 2,
          ...(depth === 0 && {
            // borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
            color: "#4B5767", // Apply bottom border if item has no parent
          }),
        }}
      >
        <Box>
          <Checkbox
            edge="start"
            checked={isSelected(item.id)}
            onChange={(event) => handleSelectItem(event, item)}
            onClick={(event) => event.stopPropagation()}
          />
        </Box>
        <Box
          sx={{
            ...(depth === 0 && {
              // borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              backgroundColor: "#01B4D2",
            }),
            paddingX: 1,
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
          onClick={() => setOpen(!open)}
        >
          <Typography sx={{ lineHeight: 2.5 }} variant="body2">
            {item.label}
          </Typography>

          {item.children && item.children.length > 0 && (
            <Box
              onClick={handleToggle}
              sx={{
                alignSelf: "center",
              }}
            >
              {open ? <IndeterminateCheckBoxIcon /> : <AddBoxIcon />}
            </Box>
          )}
        </Box>
      </ListItem>
      {item.children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child) => (
              <NestedMenuItem
                key={child.id}
                item={child}
                onSelect={onSelect}
                depth={depth + 1}
                isSelected={isSelected}
              />
            ))}
          </List>
        </Collapse>
      )}
    </Box>
  );
};

const CustomTreeView: FC = () => {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // Initialize selection based on the status attribute
  useMemo(() => {
    const selected = new Set<number>();
    const initializeSelection = (items: MenuItem[]) => {
      items.forEach((item) => {
        if (item.status === 1) {
          selected.add(item.id);
        }
        if (item.children) {
          initializeSelection(item.children);
        }
      });
    };
    initializeSelection(menuItems);
    setSelectedIds(selected);
  }, []);

  const toggleSelection = (item: MenuItem, isSelected: boolean) => {
    const updateSelection = new Set(selectedIds);

    const updateItemSelection = (item: MenuItem, isSelected: boolean) => {
      if (isSelected) {
        updateSelection.add(item.id);
      } else {
        updateSelection.delete(item.id);
      }

      if (item.children) {
        item.children.forEach((child) =>
          updateItemSelection(child, isSelected)
        );
      }
    };

    updateItemSelection(item, isSelected);
    setSelectedIds(updateSelection);
  };

  const handleSelect = (item: MenuItem, isSelected: boolean) => {
    toggleSelection(item, isSelected);
  };

  const itemIsSelected = (id: number) => selectedIds.has(id);

  const menuTree = useMemo(() => buildMenuTree(menuItems), []);

  return (
    <Box sx={{ width: "100%", height: "100%", bgcolor: "background.paper" }}>
      <List aria-labelledby="nested-list-subheader" sx={{
      }}>
        {menuTree.map((item) => (
          <NestedMenuItem
            key={item.id}
            item={item}
            onSelect={handleSelect}
            depth={0}
            isSelected={itemIsSelected}
          />
        ))}
      </List>
    </Box>
  );
};

export default CustomTreeView;
