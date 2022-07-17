const path = require('path');
const webpack = require('webpack');

const ReloadServerPlugin = require('./webpack/ReloadServerPlugin');
const {TsconfigPathsPlugin} = require('tsconfig-paths-webpack-plugin');

const nodeExternals = require('webpack-node-externals');

const cwd = process.cwd();
const isProduction = process.env.NODE_ENV === 'production';

function env(onProd, onDev) {
  return isProduction ? onProd : onDev;
}

function onlyDev(value, onProd = Array.isArray(value) ? [] : {}) {
  return env(onProd, value);
}

module.exports = {
  target: 'node',
  externals: [
    nodeExternals(),
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../../node_modules'),
    }),
  ],
  mode: env('production', 'development'),
  devtool: 'eval-cheap-source-map',
  entry: {
    server: './scripts/runServer.ts',
  },
  output: {
    path: env(path.resolve('dist'), path.resolve('build')),
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
    ...onlyDev([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
      new ReloadServerPlugin({
        script: path.resolve('build', 'server.js'),
      }),
    ]),
  ],
};
