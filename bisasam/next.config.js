/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  env: {
    GIPHY_API_KEY: process.env.GIPHY_API_KEY,
  },
  reactStrictMode: true,
  images: {
    domains: [
      "source.unsplash.com",
      "lh3.googleusercontent.com",
      "pbs.twimg.com",
    ],
  },
};

module.exports = nextConfig;
