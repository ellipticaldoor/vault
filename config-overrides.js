/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { paths: rewiredPaths } = require('react-app-rewired');
const { scriptVersion } = rewiredPaths;
const paths = require(`${scriptVersion}/config/paths`);

paths.appIndexJs = path.resolve(__dirname, `src/client/index.tsx`);
paths.appTsConfig = path.resolve(__dirname, `tsconfig.cra.json`);
paths.appTypeDeclarations = path.resolve(
  __dirname,
  `src/client/react-app-env.d.ts`,
);

const disableTsConfigCheck = () => {
  const verifyTypeScriptSetupPath = `${scriptVersion}/scripts/utils/verifyTypeScriptSetup`;
  // Module has to be required first so the cache can be overrided
  require(verifyTypeScriptSetupPath);

  // Disable tsconfig validation to customize "baseUrl" and "paths"
  require.cache[require.resolve(verifyTypeScriptSetupPath)].exports = () => {};
};

disableTsConfigCheck();

module.exports = {
  webpack: (config) => {
    // Disable eslint
    config.module.rules.splice(1, 1);

    // Disable typescript type checking
    paths.appTsConfig = undefined;

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '~': path.resolve(__dirname, 'src'),
        },
      },
    };
  },
};
