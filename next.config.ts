import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  allowedDevOrigins: ["http://172.25.48.1"], // or your device/emulator IP

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
