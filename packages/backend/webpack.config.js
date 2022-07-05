const path = require('path');
const webpack = require('webpack');

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
    extensions: ['.ts'],
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
};
