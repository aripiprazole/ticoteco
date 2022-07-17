module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'relay',
      {schema: '../../schema.graphql'},
    ],
  ],
};
