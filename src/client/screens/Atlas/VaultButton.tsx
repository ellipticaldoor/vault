import React from 'react';
import styled from 'styled-components';
import { colors } from 'client/styles';
import { prop } from 'remeda';

const VAULT_SIZE = '25px';

export type VaultButtonProps = {
  x: number;
  y: number;
};

export const VaultButton: React.FC<VaultButtonProps> = (props) => {
  return <StyledVaultButton {...props} />;
};

// TODO: active and hover style

const StyledVaultButton = styled.div<VaultButtonProps>`
  position: relative;
  cursor: pointer;
  border-radius: 50%;

  background: ${colors.primary};
  top: ${prop('x')}px;
  left: ${prop('y')}px;
  width: ${VAULT_SIZE};
  height: ${VAULT_SIZE};
`;
