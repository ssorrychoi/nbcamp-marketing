import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
const basePath = isDev ? "" : "/nbcamp-marketing";
const assetPrefix = isDev ? "" : "/nbcamp-marketing/";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix,
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "velog.velcdn.com",
      },
    ],
  },
};

export default nextConfig;
