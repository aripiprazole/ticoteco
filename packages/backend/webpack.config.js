/*
 * TikTok clone as web application
 * Copyright (C) 2022  Gabrielle Guimarães de Oliveira
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const path = require('path');
const webpack = require('webpack');

const ReloadServerPlugin = require('./webpack/ReloadServerPlugin');

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
  entry: './src/index.ts',
  output: {
    path: path.resolve('build'),
    filename: env('prod.js', 'dev.js'),
  },
  node: {
    __dirname: true,
  },
  resolve: {
    plugins: [],
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
        script: path.resolve('build', env('prod.js', 'dev.js')),
      }),
    ]),
  ],
};
