import React from 'react';
import {
  TextLabel,
  InputContainer,
  Input,
  StyledInput,
} from '~/client/components';
import { Size } from '~/client/styles';

export type InputNumberProps = {
  value: number;
  label?: string;
  placeholder?: string;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  margin?: Size;
  padding?: Size;
  inputWidth?: string;
};

export const InputNumber: React.FC<InputNumberProps> = ({
  label,
  onChange,
  margin,
  padding,
  inputWidth,
  ...props
}) => {
  return (
    <InputContainer margin={margin} padding={padding}>
      <StyledInput>
        <Input
          {...props}
          type="number"
          onChange={(event) => {
            const newValue = parseInt(event.target.value, 10);
            onChange(newValue);
          }}
          width={inputWidth}
        />
        <TextLabel margin={{ left: 'xs' }}>{label}</TextLabel>
      </StyledInput>
    </InputContainer>
  );
};
