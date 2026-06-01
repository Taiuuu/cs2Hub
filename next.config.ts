import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.NEXT_PUBLIC_EXPORT === "true" ? "export" : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
