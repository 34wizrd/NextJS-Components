// NestedOptions.tsx
import React, { useState } from 'react';
import { Select, MenuItem } from '@mui/material';

interface Option {
  value: string;
  label: string;
  parentId?: string;
}

interface NestedOptionsProps {
  options: Option[];
}

const NestedOptions: React.FC<NestedOptionsProps> = ({ options }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleChange = (index: number, value: string) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[index] = value;
    setSelectedOptions(updatedOptions.slice(0, index + 1));
  };

  const renderSelect = (index: number) => {
    const filteredOptions = index === 0 ? options : options.filter(opt => opt.parentId === selectedOptions[index - 1]);
    return (
      <Select
        value={selectedOptions[index] || ''}
        onChange={(event) => handleChange(index, event.target.value as string)}
      >
        {filteredOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    );
  };

  return (
    <div>
      {selectedOptions.map((_, index) => (
        <div key={index}>
          {renderSelect(index)}
        </div>
      ))}
    </div>
  );
};

export default NestedOptions;
