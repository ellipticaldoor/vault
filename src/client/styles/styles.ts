import { createGlobalStyle } from 'styled-components';
import { colors } from './colors';
import { lighten } from './helpers';

export const sizes = {
  xss: '0.2rem',
  xs: '0.4rem',
  sm: '0.8rem',
  md: '1.2rem',
  lg: '1.6rem',
  xl: '2rem',
  xxl: '2.4rem',
} as const;

export type SizeType = keyof typeof sizes | 'none';

export type Size =
  | SizeType
  | {
      top?: SizeType;
      right?: SizeType;
      bottom?: SizeType;
      left?: SizeType;
    };

export const getSize = (size?: Size): string => {
  if (!size || size === 'none') {
    return '0';
  }

  if (typeof size === 'object') {
    const { top, right, bottom, left } = size;
    // prettier-ignore
    return getSize(top) + ' ' + getSize(right) + ' ' + getSize(bottom) + ' ' + getSize(left);
  }

  return sizes[size];
};

export const border = {
  radius: '4px',
  width: '0px',
};

export const outline = `
outline: none;
&:focus {
  box-shadow: 0 0 0 0.16rem ${lighten(colors.primary, 1.2)}
}`;

export const fonts = {
  base: "-apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto",
  mono: "'SF Mono', 'Segoe UI Mono', 'Roboto Mono', Menlo, Courier, monospace",
  fallback: "'Helvetica Neue', sans-serif",
};

export const GlobalStyle = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
  }

  body {
    background: ${colors.background};
    color: ${colors.font};
    font-family: ${fonts.base};
    font-size: ${sizes.md};
    text-rendering: optimizeLegibility;
  }

  a, a:visited {
		color: ${colors.link};
		text-decoration: none;

		&:hover {
      text-decoration: underline
    }
  }
`;
