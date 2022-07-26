const {
  createResolvePath,
} = require('babel-plugin-tsconfig-paths-module-resolver');

const defaultResolvePath = createResolvePath();

function customResolvePath(sourceFile, currentFile, opts) {
  const result = defaultResolvePath(sourceFile, currentFile, opts);

  return result ? (result + '.js') : result;
}

module.exports = {
  presets: [
    '@babel/preset-typescript',
    ['@babel/preset-env', {targets: {node: 'current'}}],
  ],
  plugins: [
    ['tsconfig-paths-module-resolver', {resolvePath: customResolvePath}],
  ],
};
