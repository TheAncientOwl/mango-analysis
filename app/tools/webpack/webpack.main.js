const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: ['./src/main/app.ts'],
  // Put your normal webpack config below here
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'src/main/python-build', to: 'python-build' }],
    }),
  ],
  module: {
    rules: require('./webpack.rules'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    alias: require('./webpack.aliases'),
  },
  stats: 'minimal',
};
