/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_KEY: process.env.API_KEY,
    API_URL: process.env.API_URL,
    SHOW_CONSOLE: process.env.SHOW_CONSOLE,
  },
};

module.exports = nextConfig;
