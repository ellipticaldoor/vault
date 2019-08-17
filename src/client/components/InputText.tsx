import React from 'react';
import {
  TextLabel,
  InputContainer,
  Input,
  Text,
  StyledInput,
} from '~/client/components';
import { Size, colors } from '~/client/styles';

export type InputTextProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  password?: boolean;
  margin?: Size;
  errorMessage?: string;
};

export const InputText: React.FC<InputTextProps> = ({
  label,
  onChange,
  margin,
  password = false,
  errorMessage,
  ...props
}) => {
  return (
    <InputContainer margin={margin}>
      <StyledInput>
        <TextLabel>{label}</TextLabel>
        <Input
          {...props}
          type={password ? 'password' : 'text'}
          onChange={(event) => {
            onChange(event.target.value);
          }}
        />
      </StyledInput>
      <Text color={colors.error} margin={{ top: 'sm' }}>
        {errorMessage}
      </Text>
    </InputContainer>
  );
};
