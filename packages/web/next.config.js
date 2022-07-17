const withTM = require('next-transpile-modules')([
  '@ticoteco/ui',
  '@ticoteco/shared',
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  compiler: {
    relay: require('./relay.config'),
  },

  webpack: (config) => {
    config.resolve.fallback = {fs: false, module: false};

    return config;
  },
};

module.exports = withTM(nextConfig);
