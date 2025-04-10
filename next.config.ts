import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    useCache: true,
    ppr: true,
    dynamicIO: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
