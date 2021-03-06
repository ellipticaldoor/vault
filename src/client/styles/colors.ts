export const palette = {
  white: '#ffffff',
  chestnutRose: '#cc4466',
  viola: '#e691c3',
  persianRose: '#ee2299',
  meteorite: '#442277',
  blackRock: '#110033',
  coldPurple: '#99aadd',
  bermudaGray: '#5891c3',
  pickledBluewood: '#223344',
  elm: '#228888',
  mintTulip: '#cceeee',
  puertoRico: '#29c6b3',
  aquamarine: '#66ffdd',
  fern: '#55bb66',
  atlantis: '#77cc33',
  sulu: '#bbee77',
  goldenFizz: '#ffff33',
  goldTips: '#e7b305',
  almond: '#eeddcc',
  fire: '#bb3300',
  apricot: '#fa9173',

  // Complementaries
  black: '#000000',
  vistaBlue: '#89ccaa',
  malachite: '#21ed76',
  fernFrond: '#567823',
  madras: '#223300',
  brandy: '#decd99',
  sandal: '#ab8967',
  iroko: '#453422',
  burntUmber: '#872222',
  oysterPink: '#edcccc',
  chesnut: '#ba4355',
  brinkPink: '#ff598f',
  fuchsiaPink: '#ba54a9',
  purpleHeart: '#8733cc',
  portage: '#c374fa',
  blueRibbon: '#1144ed',
  linkWater: '#e2eefa',
  bondiBlue: '#0093d5',
  spray: '#77dbed',

  social: {
    twitter: '#55acee',
    github: '#574f4f',
    mail: '#e55b51',
    rss: '#f8991d',
  },
};

export const colors = {
  background: palette.white,
  text: palette.blackRock,
  link: palette.bondiBlue,
  linkVisited: palette.purpleHeart,
  base: palette.linkWater,
  lightBase: palette.mintTulip,
  primary: palette.meteorite,
  secondary: palette.bermudaGray,
  error: palette.brinkPink,
} as const;

export type Color = keyof typeof colors;

export const resourceColors = {
  iron: palette.chestnutRose,
  dwellers: palette.spray,
} as const;

export type ResourceColor = keyof typeof resourceColors;
