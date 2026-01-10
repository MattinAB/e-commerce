import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "picsum.photos" }],
  },
  reactCompiler: true,
};

export default nextConfig;
