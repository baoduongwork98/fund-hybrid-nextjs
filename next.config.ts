import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://chat.runsystem.vn/api/v4/users/**')],
  },
};

export default nextConfig;
