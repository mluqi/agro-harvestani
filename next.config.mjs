import withNextIntl from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "api.agroharvestani.com",
        pathname: "**",
      }
    ],
  },
};

const withIntl = withNextIntl("./i18n.js");

export default withIntl(nextConfig);
