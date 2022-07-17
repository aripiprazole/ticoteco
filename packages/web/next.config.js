const withTM = require('next-transpile-modules')([
  '@ticoteco/ui',
  '@ticoteco/shared',
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack: (config) => {
    config.resolve.fallback = {fs: false, module: false};

    return config;
  },
};

module.exports = withTM(nextConfig);
