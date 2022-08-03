const withTM = require('next-transpile-modules')([
  '@ticoteco/ui',
  '@ticoteco/shared',
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // TODO: do not use react-firebaseui
  // https://github.com/firebase/firebaseui-web-react/issues/59
  reactStrictMode: false,

  compiler: {
    relay: require('./relay.config'),
  },

  webpack: (config) => {
    config.resolve.fallback = {fs: false, module: false};

    return config;
  },
};

module.exports = withTM(nextConfig);
