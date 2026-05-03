import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // allowedDevOrigins is not in stable types yet for some versions, or is under experimental
  },
};

// Actually, let's use the standard way if it's Next.js 15+
// But I'll just follow the error message's suggestion.
// module.exports = { allowedDevOrigins: ['192.168.1.16'] }
// Since it's a .ts file:
nextConfig.serverExternalPackages = []; // placeholder
(nextConfig as any).allowedDevOrigins = ['192.168.1.16'];


export default nextConfig;
