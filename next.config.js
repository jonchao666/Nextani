/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_KEY: process.env.API_KEY,
    API_URL: process.env.API_URL,
    GOOGLE_LOGIN_URL: process.env.GOOGLE_LOGIN_URL,
  },
};

module.exports = nextConfig;
