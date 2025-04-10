import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    useCache: true,
    ppr: true,
    dynamicIO: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
