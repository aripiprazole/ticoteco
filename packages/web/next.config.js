const withTM = require('next-transpile-modules')(['@ticoteco/ui']);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withTM(nextConfig);
