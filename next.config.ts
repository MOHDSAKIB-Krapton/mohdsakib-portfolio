import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  allowedDevOrigins: ["http://172.25.48.1"], // or your device/emulator IP
  images: {
    domains: ["images.pexels.com"],
  },
};

export default nextConfig;
