import type { NextConfig } from "next";
// /** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'picsum.photos',
  //       port: '',
  //       pathname: '/**',
  //     },
  //   ],
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dthcmidmavrmnaqfixee.supabase.co',
        port: '', // leave blank
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

module.exports = nextConfig;