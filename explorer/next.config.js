/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    RPC_URL: process.env.RPC_URL || 'http://localhost:8545',
    CHAIN_NAME: process.env.CHAIN_NAME || 'TheBlockchainCoders',
    CURRENCY_SYMBOL: process.env.CURRENCY_SYMBOL || 'TBC',
  },
};

module.exports = nextConfig;
