import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    useCache: true,
    ppr: true,
    dynamicIO: true,
  },
};

export default nextConfig;
