const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebPackPlugin = require('html-webpack-plugin');
module.exports = merge(common, {
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'publicPath',
    filename: '[name].min.js',
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'src')+'/index.html',
      filename: path.resolve(__dirname, 'dist')+'/index.html'
    }),
  ],
});