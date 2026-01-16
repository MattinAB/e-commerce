import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "picsum.photos" },
      { hostname: "pixabay.com" },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
