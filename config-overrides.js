/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { paths: rewiredPaths } = require('react-app-rewired');
const { scriptVersion } = rewiredPaths;
const paths = require(`${scriptVersion}/config/paths`);

paths.appIndexJs = path.resolve(__dirname, `src/client/index.tsx`);
paths.appTypeDeclarations = path.resolve(
  __dirname,
  `src/client/react-app-env.d.ts`,
);
paths.appTsConfig = path.resolve(__dirname, `tsconfig.cra.json`);

module.exports = function override(config) {
  // Disable eslint checking
  config.module.rules.splice(1, 1);

  return config;
};