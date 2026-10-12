import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  devIndicators: false,

  images: {
    unoptimized: true,
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vercel.com",
        pathname: "/oss/**",
      },
    ],
  },

  skipTrailingSlashRedirect: true,
};

export default nextConfig;
