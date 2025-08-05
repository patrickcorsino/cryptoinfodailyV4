/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "assets.coingecko.com",
      "static.coingecko.com",
      "www.coingecko.com",
      "s2.coinmarketcap.com",
      "cryptologos.cc"
    ],
  },
};

module.exports = nextConfig;
