/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  headers: [
    {
      source: "/:all*(svg|jpg|png)",
      locale: false,
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=9999999999, must-revalidate",
        },
      ],
    },
  ],
};

module.exports = nextConfig;
