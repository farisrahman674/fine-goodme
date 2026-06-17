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
      {
        source: "/index.php",
        destination: "/",
        permanent: true,
      },
      {
        source: "/:locale/product/:slug",
        destination: "/:locale/product/machine/:slug",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
