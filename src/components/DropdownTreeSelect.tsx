import React, { useState } from 'react';

interface TreeNode {
  id: string;
  name: string;
  parentId?: string;
  children?: TreeNode[];
  isOpen?: boolean;
}

interface DropdownTreeSelectProps {
  data: TreeNode[];
}

const buildTree = (nodes: TreeNode[]): TreeNode[] => {
  const rootNodes: TreeNode[] = [];
  const mappedNodes: { [key: string]: TreeNode } = {};

  nodes.forEach((node) => {
    mappedNodes[node.id] = { ...node, children: [], isOpen: false };
  });

  nodes.forEach((node) => {
    if (node.parentId) {
      const parent = mappedNodes[node.parentId];
      if (parent) {
        parent.children!.push(mappedNodes[node.id]);
      }
    } else {
      rootNodes.push(mappedNodes[node.id]);
    }
  });

  return rootNodes;
};

const DropdownTreeSelect: React.FC<DropdownTreeSelectProps> = ({ data }) => {
  const [treeData, setTreeData] = useState<TreeNode[]>(buildTree(data));
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>('Select Item');

  const toggleNode = (id: string) => {
    const toggleNodeOpen = (nodes: TreeNode[]): TreeNode[] =>
      nodes.map(node => ({
        ...node,
        isOpen: node.id === id ? !node.isOpen : node.isOpen,
        children: node.children ? toggleNodeOpen(node.children) : [],
      }));

    setTreeData(toggleNodeOpen(treeData));
  };

  const selectItem = (name: string) => {
    setSelectedItem(name);
    setIsOpen(false); // Close the dropdown when an item is selected
  };

  const toggleCollapse = (id: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevents the event from bubbling up to parent elements
    toggleNode(id);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const renderTreeNodes = (nodes: TreeNode[]) => (
    <ul style={{ listStyleType: "none", paddingLeft: "20px", margin: 0 }}>
      {nodes.map((node) => (
        <li key={node.id} style={{ padding: "5px 0", cursor: "pointer" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {node.children && node.children.length > 0 ? (
              <span
                style={{ marginRight: "10px", cursor: "pointer" }}
                onClick={(event) => toggleCollapse(node.id, event)}
              >
                {node.isOpen ? '▼' : '►'}
              </span>
            ) : (
              <span style={{ marginRight: "10px", opacity: 0 }}>▼</span>
            )}
            <span onClick={() => selectItem(node.name)} style={{ flex: 1, cursor: "pointer" }}>
              {node.name}
            </span>
          </div>
          {node.isOpen && node.children && node.children.length > 0 && renderTreeNodes(node.children)}
        </li>
      ))}
    </ul>
  );

  return (
    <div style={{ maxWidth: "300px", margin: "20px auto" }}>
      <button
        onClick={toggleDropdown}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        {isOpen ? ('Select Item' + '▼')  : selectedItem}
      </button>
      {isOpen && (
        <div
          style={{
            border: "1px solid #ddd",
            marginTop: "10px",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            padding: "10px",
          }}
        >
          {renderTreeNodes(treeData)}
        </div>
      )}
    </div>
  );
};

export default DropdownTreeSelect;