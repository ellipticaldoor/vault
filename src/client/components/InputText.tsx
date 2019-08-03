import React from 'react';
import { TextLabel, InputContainer, Input } from 'client/components';
import { Size } from 'client/styles';

export type TextInputProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  password?: boolean;
  margin?: Size;
};

export const TextInput: React.FC<TextInputProps> = ({
  label,
  onChange,
  margin,
  password = false,
  ...props
}) => {
  return (
    <InputContainer margin={margin}>
      <TextLabel>{label}</TextLabel>
      <Input
        {...props}
        type={password ? 'password' : 'text'}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
    </InputContainer>
  );
};
