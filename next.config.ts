import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    useCache: true,
    ppr: true,
    dynamicIO: true,
    authInterrupts: true,
    nodeMiddleware: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  redirects: async () => {
    return [
      {
        source: "/sign-up",
        destination: "/sign-in",
        permanent: true,
      },
    ];
  }
};

export default nextConfig;
