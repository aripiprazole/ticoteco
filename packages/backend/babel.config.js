module.exports = {
  presets: [
    '@babel/preset-typescript',
    ['@babel/preset-env', {targets: {node: 'current'}}],
  ],
  plugins: [['babel-plugin-tsconfig-paths', {
    relative: true,
    extensions: [
      '.ts',
    ],
    rootDir: '.',
    tsconfig: 'tsconfig.json',
  }]],
};
