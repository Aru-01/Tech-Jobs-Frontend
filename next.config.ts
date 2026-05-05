import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add COOP header so Google popup login works correctly
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'tech-jobs-backend.vercel.app',
      }
    ],
  },
};

export default nextConfig;
