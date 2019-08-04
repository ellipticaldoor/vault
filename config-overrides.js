module.exports = function override(config) {
  // remove eslint plugin (index #1)
  config.module.rules.splice(1, 1);

  return config;
};
