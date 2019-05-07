/* eslint import/no-extraneous-dependencies: 0, no-unused-vars: 1, no-console: 0 */
const webpack = require('webpack');
const path = require('path');
const pkg = require('./package.json');

const isProduction = process.env.NODE_ENV === 'production';
const libraryName = pkg.name;

console.log('isProduction: ', isProduction);

module.exports = {
  entry: './src/EnumBug.js',
  mode: isProduction ? 'production' : 'development',
  optimization: {
    minimize: false,
  },
  devtool: isProduction ? undefined : 'inline-source-map',
  output: {
    filename: `${libraryName}.js`,
    path: path.join(__dirname, 'dist'),
    library: libraryName,
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ],
  },
};
