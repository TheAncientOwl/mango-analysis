const { createWebpackAliases } = require('./webpack.helpers');

// Export aliases
module.exports = createWebpackAliases({
  '@src': 'src',
  '@common': 'src/common',
  '@main': 'src/main',
  '@renderer': 'src/renderer',
});
