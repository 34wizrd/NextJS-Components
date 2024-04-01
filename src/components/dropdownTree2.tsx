import React, { useState } from "react";

export interface TreeNode {
  id: number;
  label: string;
  parentId?: number;
}

interface DropdownTreeProps {
  data: TreeNode[];
  onSelect: (node: TreeNode) => void;
}

export const DropdownTree2: React.FC<DropdownTreeProps> = ({
  data,
  onSelect,
}) => {
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleNodeClick = (node: TreeNode) => {
    setSelectedNode(node);
    onSelect(node);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-tree">
      <button onClick={toggleDropdown}>
        {selectedNode ? selectedNode.label : "Select"}
      </button>
      {isOpen && (
        <ul className="tree">
          {data.map((node) => (
            <TreeNodeItem
              key={node.id}
              node={node}
              data={data}
              isOpen={isOpen}
              onClick={handleNodeClick}
            ></TreeNodeItem>
          ))}
        </ul>
      )}
      {selectedNode && (
        <div className="selected-node">Selected: {selectedNode.label}</div>
      )}
    </div>
  );
};

interface TreeNodeItemProps {
  node: TreeNode;
  data: TreeNode[];
  isOpen: boolean;
  onClick: (node: TreeNode) => void;
}

const TreeNodeItem: React.FC<TreeNodeItemProps> = ({
  node,
  data,
  isOpen,
  onClick,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleItemClick = () => {
    if (isExpanded) {
      setIsExpanded(false); // Collapse the node if already expanded
    } else {
      onClick(node);
      setIsExpanded(true); // Expand the node if collapsed
    }
  };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const children = data.filter((childNode) => childNode.parentId === node.id);

  return (
    <li>
      <div
        style={{
          display: "flex",
        }}
      >
        <span onClick={toggleExpansion}>
          {isExpanded ? "[-]" : "[+]"} {node.label}
        </span>
      </div>
      {isOpen && isExpanded && (
        <ul>
          {children.map((childNode) => (
            <TreeNodeItem
              key={childNode.id}
              node={childNode}
              data={data}
              isOpen={isOpen}
              onClick={onClick}
            ></TreeNodeItem>
          ))}
        </ul>
      )}
    </li>
  );
};
