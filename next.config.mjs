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
    unoptimized: false,
    domains: ['www.xmf.co.in', 'xmf.co.in'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'www.xmf.co.in',
      },
      {
        protocol: 'https',
        hostname: 'xmf.co.in',
      }
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "(.*)\\.vercel\\.app",
          },
        ],
        destination: "https://www.xmf.co.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig
