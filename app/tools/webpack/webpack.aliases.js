const { createWebpackAliases } = require('./webpack.helpers');

// Export aliases
module.exports = createWebpackAliases({
  '@src': 'src',
  '@common': 'src/common',
  '@main': 'src/main',
  '@renderer': 'src/renderer',
  '@components': 'src/renderer/components',
  '@config': 'src/renderer/config',
  '@hooks': 'src/renderer/hooks',
  '@modules': 'src/renderer/modules',
  '@store': 'src/renderer/store',
  '@styles': 'src/renderer/styles',
});
