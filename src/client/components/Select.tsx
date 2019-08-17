import React from 'react';
import {
  TextLabel,
  InputContainer,
  StyledInput,
  DEFAULT_INPUT_WIDTH,
} from '~/client/components';
import { SizeType, sizes, border, colors, outline } from '~/client/styles';
import styled from 'styled-components';

export type SelectProps = {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  label?: string;
  margin?: SizeType;
  width?: string;
};

export const Select: React.FC<SelectProps> = ({
  width = DEFAULT_INPUT_WIDTH,
  label,
  onChange,
  options,
}) => {
  return (
    <InputContainer>
      <StyledInput>
        <TextLabel>{label}</TextLabel>
        <StyledSelect
          width={width}
          onChange={(event) => {
            onChange(event.target.value);
          }}
        >
          {options.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </StyledSelect>
      </StyledInput>
    </InputContainer>
  );
};

const SELECT_ICON_SVG =
  "data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%204%205'%3E%3Cpath%20fill='%23667189'%20d='M2%200L0%202h4zm0%205L0%203h4z'/%3E%3C/svg%3E";

const SELECT_ICON_POSITION = 'right 0.35rem center / 0.4rem 0.5rem';

const selectBackground = `${colors.background} url("${SELECT_ICON_SVG}") no-repeat ${SELECT_ICON_POSITION}`;

const StyledSelect = styled.select<{ width: string }>`
  cursor: pointer;
  appearance: none;
  vertical-align: middle;
  padding: 0px ${sizes.sm};
  height: ${sizes.xxl};
  border: ${border.width};
  border-radius: ${border.radius};
  font-size: ${sizes.md};
  width: ${({ width }) => width};
  background: ${selectBackground};
  ${outline};

  &::-ms-expand {
    display: none;
  }
`;
