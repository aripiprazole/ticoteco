const withTM = require('next-transpile-modules')([
  '@ticoteco/ui',
  '@ticoteco/shared',
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withTM(nextConfig);
