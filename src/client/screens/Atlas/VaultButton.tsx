import React from 'react';
import styled from 'styled-components';
import { colors } from '~/client/styles';

const VAULT_BORDER = 2;
const VAULT_SIZE = 24;
const TOTAL_VAULT_SIZE = VAULT_SIZE + VAULT_BORDER;

export type VaultButtonProps = {
  x: number;
  y: number;
};

export const VaultButton: React.FC<VaultButtonProps> = (props) => {
  return <StyledVaultButton {...props} />;
};

// TODO: active and hover style

const StyledVaultButton = styled.div<VaultButtonProps>`
  position: absolute;
  cursor: pointer;
  border-radius: 50%;
  display: inline-block;

  border: ${VAULT_BORDER}px solid ${colors.primary};
  background: ${colors.background};
  width: ${VAULT_SIZE}px;
  height: ${VAULT_SIZE}px;
  left: ${({ x }) => x + TOTAL_VAULT_SIZE / 2}px;
  top: ${({ y }) => y + TOTAL_VAULT_SIZE / 2}px;
`;
