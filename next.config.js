/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/id",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
