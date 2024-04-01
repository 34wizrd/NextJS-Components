import React, { useState } from "react";
import { Popover, TextField, Typography } from "@mui/material";
import clsx from "clsx";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeItem, TreeItemProps, TreeView } from "@mui/x-tree-view";

interface CustomContentProps {
  classes: {
    root: string;
    expanded: string;
    selected: string;
    focused: string;
    disabled: string;
    iconContainer: string;
    label: string;
  };
  className: string;
  label: React.ReactNode;
  nodeId: string;
  icon?: React.ReactNode;
  expansionIcon?: React.ReactNode;
  displayIcon?: React.ReactNode;
}

const CustomContent = React.forwardRef<HTMLDivElement, CustomContentProps>(
  function CustomContent(props, ref) {
    const {
      classes,
      className,
      label,
      nodeId,
      icon: iconProp,
      expansionIcon,
      displayIcon
    } = props;

    const {
      disabled,
      expanded,
      selected,
      focused,
      handleExpansion,
      handleSelection,
      preventSelection
    } = useTreeItem(nodeId);

    const icon = iconProp || expansionIcon || displayIcon;

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
      preventSelection(event);
    };

    const handleExpansionClick = (event: React.MouseEvent<HTMLDivElement>) => {
      handleExpansion(event);
    };

    const handleSelectionClick = (event: React.MouseEvent<HTMLDivElement>) => {
      handleSelection(event);
    };

    return (
      <div
        className={clsx(className, classes.root, {
          [classes.expanded]: expanded,
          [classes.selected]: selected,
          [classes.focused]: focused,
          [classes.disabled]: disabled
        })}
        onMouseDown={handleMouseDown}
        ref={ref}
        style={{ padding: "3px 0" }}
      >
        <div onClick={handleExpansionClick} className={classes.iconContainer}>
          {icon}
        </div>
        <Typography
          onClick={handleSelectionClick}
          component="div"
          className={classes.label}
        >
          {label}
        </Typography>
      </div>
    );
  }
);

const CustomTreeItem: React.FC<TreeItemProps> = (props) => (
  <TreeItem ContentComponent={CustomContent} {...props} />
);

interface HierarchicalDropDownProps {
  edit: boolean;
  newData: any[]; // You should replace any with the actual type of newData
}

const HierarchicalDropDown: React.FC<HierarchicalDropDownProps> = ({
  edit,
  newData
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [equipmentItem, setEquipmentItem] = useState("");
  const [equipmentId, setEquipmentId] = useState("");

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const renderTree = (nodes: any) => (
    <CustomTreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node: any) => renderTree(node))
        : null}
    </CustomTreeItem>
  );

  return (
    <>
      <TextField
        variant="standard"
        required={false}
        label="Equipment Item"
        name="equipmentItem"
        id="equipmentItem"
        defaultValue={equipmentItem}
        value={equipmentItem}
        className="w-100"
        inputProps={{ readOnly: !edit }}
        onClick={handleClick}
      />

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
      >
        <TreeView
          aria-label="icon expansion"
          defaultSelected={equipmentId}
          selected={equipmentId}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          onNodeSelect={(e: { target: { innerText: React.SetStateAction<string>; }; }, id: React.SetStateAction<string>) => {
            setEquipmentId(id);
            setEquipmentItem(e.target.innerText);
          }}
          sx={{
            height: 200,
            flexGrow: 1,
            minWidth: "200px",
            overflowY: "auto"
          }}
        >
          {newData && newData.map((item, i) => renderTree(item))}
        </TreeView>
      </Popover>
    </>
  );
};

export default HierarchicalDropDown;
