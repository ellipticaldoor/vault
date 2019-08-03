import React from 'react';
import { TextLabel, InputContainer } from 'client/components';
import { SizeType } from 'client/styles';

export type SelectProps = {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  label?: string;
  margin?: SizeType;
};

export const Select: React.FC<SelectProps> = ({ label, onChange, options }) => {
  return (
    <InputContainer>
      <TextLabel>{label}</TextLabel>
      <select
        onChange={(event) => {
          onChange(event.target.value);
        }}
      >
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
    </InputContainer>
  );
};
