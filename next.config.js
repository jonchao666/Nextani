/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_KEY: process.env.API_KEY,
    API_URL: process.env.API_URL,
  },
};

module.exports = nextConfig;
