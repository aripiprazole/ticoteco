const path = require('path');
const webpack = require('webpack');

const ReloadServerPlugin = require('./webpack/ReloadServerPlugin');

const {TsconfigPathsPlugin} = require('tsconfig-paths-webpack-plugin');

const cwd = process.cwd();

module.exports = {
  target: 'node',
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  entry: {
    server: './src/index.ts',
  },
  output: {
    path: path.resolve('build'),
    filename: 'server.js',
  },
  node: {
    __dirname: true,
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin({})],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts)?$/,
        use: {
          loader: 'babel-loader',
        },
        include: [path.join(cwd, 'src'), path.join(cwd, '../')],
      },
    ],
  },
  plugins: [
    new ReloadServerPlugin({
      script: path.resolve('build', 'server.js'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
};
