import React from 'react';

export type ButtonProps = {
  onClick: () => void;
  title: string;
};

export const Button: React.FC<ButtonProps> = ({ title, ...props }) => {
  return <button {...props}>{title}</button>;
};
