import type { NextConfig } from "next";
import path from "path";

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
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
