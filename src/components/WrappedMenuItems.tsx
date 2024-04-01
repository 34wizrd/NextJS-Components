import React from 'react';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';

// Sample data for dynamic menu sections and items
const menuData: { label: string; items: { label: string; onClick: () => void; disabled?: boolean }[] }[] = [
  {
    label: 'Navigation',
    items: [
      { label: 'Back', onClick: () => console.log('Clicked on Back') },
      { label: 'Forward', onClick: () => console.log('Clicked on Forward'), disabled: true },
      { label: 'Refresh', onClick: () => console.log('Clicked on Refresh') }
    ]
  },
  {
    label: 'Page',
    items: [
      { label: 'Save as...', onClick: () => console.log('Clicked on Save as...') },
      { label: 'Print...', onClick: () => console.log('Clicked on Print...') }
    ]
  },
  {
    label: 'View',
    items: [
      { label: 'Zoom in', onClick: () => console.log('Clicked on Zoom in') },
      { label: 'Zoom out', onClick: () => console.log('Clicked on Zoom out') }
    ]
  }
];

// Dynamic MenuSection component
const MenuSection: React.FC<{ section: { label: string; items: { label: string; onClick: () => void; disabled?: boolean }[] } }> = ({ section }) => {
  return (
    <MenuSectionRoot role="group">
      <MenuSectionLabel>{section.label}</MenuSectionLabel>
      <ul>
        {section.items.map((item, index) => (
          <MenuItem
            key={index}
            onClick={item.onClick}
            disabled={item.disabled}
          >
            {item.label}
          </MenuItem>
        ))}
      </ul>
    </MenuSectionRoot>
  );
};

const DynamicMenu: React.FC = () => {
  return (
    <Dropdown>
      <MenuButton>Options</MenuButton>
      <Menu slots={{ listbox: Listbox }}>
        {menuData.map((section, index) => (
          <MenuSection key={index} section={section} />
        ))}
        <li className="helper">Current zoom level: 100%</li>
      </Menu>
    </Dropdown>
  );
};

// Styled components
const Listbox = styled('ul')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 6px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
  };
  z-index: 1;
  `,
);

const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &:focus {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }
  `,
);

const MenuButton = styled(BaseMenuButton)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:active {
    background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }
`,
);

const grey = {
  // Grey palette
};

const blue = {
  // Blue palette
};

const MenuSectionRoot = styled('li')`
  list-style: none;

  & > ul {
    padding-left: 1em;
  }
`;

const MenuSectionLabel = styled('span')`
  display: block;
  padding: 10px 0 5px 10px;
  font-size: 0.75em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  color: ${grey[600]};
`;

export default DynamicMenu;
