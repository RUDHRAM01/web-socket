const path = require('path');

module.exports = function override(config, env) {
  // Add a fallback for the 'stream' module
  config.resolve.fallback = {
    ...config.resolve.fallback,
      stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify'),
  };

  return config;
};
