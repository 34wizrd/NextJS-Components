import React, { useState } from "react";

interface TreeNode {
  id: number;
  label: string;
  children?: TreeNode[];
}

interface DropdownTreeProps {
  data: TreeNode[];

  // A callback function to handle node selection
  onSelect: (node: TreeNode) => void;
}

export const DropdownTree1: React.FC<DropdownTreeProps> = ({
  data,
  onSelect,
}) => {
  // State for selected node
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

  // State for dropdown visibility
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

  // callback function to handle node clicks
  onClick: (node: TreeNode) => void;
}

const TreeNodeItem: React.FC<TreeNodeItemProps> = ({ node, onClick }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleItemClick = () => {
    onClick(node);
  };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li>
      <div
        style={{
          display: "flex",
        }}
      >
        <span onClick={handleItemClick}>{node.label}</span>
        {node.children && (
          <span className="toggle" onClick={toggleExpansion}>
            {isExpanded ? "[-]" : "[+]"}
          </span>
        )}
      </div>
      {node.children && isExpanded && (
        <ul>
          {node.children.map((childNode) => (
            <TreeNodeItem
              key={childNode.id}
              node={childNode}
              onClick={onClick}
            ></TreeNodeItem>
          ))}
        </ul>
      )}
    </li>
  );
};
