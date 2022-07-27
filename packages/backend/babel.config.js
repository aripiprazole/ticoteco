import moduleResolver from 'babel-plugin-tsconfig-paths-module-resolver';

const defaultResolvePath = moduleResolver.createResolvePath();

function customResolvePath(sourceFile, currentFile, opts) {
  const result = defaultResolvePath(sourceFile, currentFile, opts);

  return result ? (result + '.js') : result;
}

export default {
  presets: [
    '@babel/preset-typescript',
    ['@babel/preset-env', {targets: {node: 'current'}}],
  ],
  plugins: [
    ['tsconfig-paths-module-resolver', {resolvePath: customResolvePath}],
  ],
};
