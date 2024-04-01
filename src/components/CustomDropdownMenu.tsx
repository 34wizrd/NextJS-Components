import React, { useState, useMemo, FC } from "react";
import {
  Button,
  Popover,
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemIcon,
  Typography,
  Box,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import HeightIcon from "@mui/icons-material/Height";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

interface MenuItem {
  id: number;
  label: string;
  parentId: number | null;
  children?: MenuItem[];
}

interface NestedMenuItemProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
}

const menuItems: MenuItem[] = [
  { id: 1, label: "Menu Item 1", parentId: null },
  { id: 2, label: "Submenu Item 1", parentId: 1 },
  { id: 3, label: "Submenu Item 2", parentId: 1 },
  { id: 4, label: "Menu Item 2", parentId: null },
  { id: 5, label: "Submenu Item 3", parentId: 4 },
  { id: 6, label: "Sub-submenu Item 1", parentId: 5 },
  { id: 7, label: "Sub-submenu Item 2", parentId: 5 },
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

const NestedMenuItem: FC<NestedMenuItemProps> = ({ item, onSelect }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // Prevent onSelect when toggling
    setOpen(!open);
  };

  const handleSelectItem = (event: React.MouseEvent<HTMLElement>) => {
    onSelect(item);
    event.stopPropagation(); // Prevent further propagation
  };

  return (
    <>
      <ListItem
        onClick={handleSelectItem}
        sx={{
          ...(item.parentId === null && {
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
            color: "#4B5767", // Apply bottom border if item has no parent
            padding: 1
          }),
        }}
      >
        <ListItemText>
          <Typography sx={{
            fontSize: 13
          }}>{item.label}</Typography>
        </ListItemText>

        {item.children && item.children.length > 0 ? (
          <Box
            onClick={handleToggle}
            // sx={{
            //   display: "flex",
            //   justifyContent: "center",
            // }}
          >
            {open ? <IndeterminateCheckBoxIcon /> : <AddBoxIcon />}
          </Box>
        ) : null}
      </ListItem>
      {item.children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child, index) => (
              <NestedMenuItem key={index} item={child} onSelect={onSelect} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

const CustomDropdownMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const menuTree = useMemo(() => buildMenuTree(menuItems), []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (item: MenuItem) => {
    setSelectedItem(item);
    handleClose(); // Close the menu after selection
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box sx={{}}>
      <Button
        aria-describedby={id}
        variant="outlined"
        onClick={handleClick}
        sx={{
          width: "30%",
          display: "flex",
          justifyContent: "space-between",
          color: "black",
          backgroundColor: "#FFFFFF !important",
          border: "none"
        }}
      >
        <Typography sx={{
            fontSize: 13
        }}>{selectedItem ? selectedItem.label : "Select"}</Typography>
        <HeightIcon></HeightIcon>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          style: {
            width: anchorEl ? anchorEl.clientWidth : undefined, // Match the Popover width with the Button width
          },
        }}
      >
        <List
          sx={{
            padding: 1,
            fontSize: 13,
          }}
        >
          {menuTree.map((item, index) => (
            <NestedMenuItem key={index} item={item} onSelect={handleSelect} />
          ))}
        </List>
      </Popover>
    </Box>
  );
};

export default CustomDropdownMenu;
