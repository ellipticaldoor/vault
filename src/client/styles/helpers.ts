import Color from 'color'; // https://github.com/Qix-/color

export const lighten = (hexColor: string, ratio: number) => {
  return Color(hexColor)
    .lighten(ratio)
    .hex();
};

export const darken = (hexColor: string, ratio: number) => {
  return Color(hexColor)
    .darken(ratio)
    .hex();
};
