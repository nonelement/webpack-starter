const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Base
const path = require('path');

const src = 'src';
const dist = 'dist';
const libs = [
  'react',
  'react-dom'
];

let base = {
  name: 'starter',
  mode: 'development',
  resolve: {
    extensions: ['.html', '.js', '.ts', '.tsx']
  },
  context: path.resolve(src),
  entry: './index.tsx', // make dynamic for module / app builds

  devServer: {
    contentBase: [
      path.resolve(dist),
      ...libs.map(lib => path.resolve('node_modules', lib, 'umd'))
    ]
  },

  module: {
    rules: [
      { test: /\.js$/, use: [ 'source-map-loader' ], enforce: 'pre' },
      { test: /\.ts(x?)$/, use: [ 'ts-loader' ] },
      {
        test: /\.s[ac]ss$/i,
        use: [
          //'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },

  // if module
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: 'index.html' }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    })
  ],

  output: {
    filename: '[name].js'
  },

  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }
};

module.exports = base;
