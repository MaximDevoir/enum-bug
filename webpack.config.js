/* eslint import/no-extraneous-dependencies: 0 no-unused-vars: 1 */
const webpack = require('webpack');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
console.log('isProduction: ', isProduction);

const prodPlugins = [];

if (isProduction) {
  prodPlugins.push(new webpack.optimize.UglifyJsPlugin({
    mangle: false,
    beautify: true,
  }));
}

module.exports = {
  entry: './src/EnumBug.js',
  devtool: isProduction ? undefined : 'source-map',
  output: {
    filename: 'enumbug.js',
    path: path.join(__dirname, 'dist'),
    library: 'enumBug',
    libraryTarget: 'commonjs2',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [].concat(prodPlugins),
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  eslint: {
    configFile: path.join(__dirname, '.eslintrc'),
  },
};
