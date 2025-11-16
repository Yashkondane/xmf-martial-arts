/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SITE_URL: "https://www.xmf.co.in",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['www.xmf.co.in', 'xmf.co.in'],
    unoptimized: false, // Enable optimization for better performance
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.xmf.co.in',
      },
      {
        protocol: 'https',
        hostname: 'xmf.co.in',
      },
    ],
  },
  output: 'standalone',
};

export default nextConfig
