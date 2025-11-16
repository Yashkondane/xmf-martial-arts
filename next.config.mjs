/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this to ensure your production domain is used
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
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            // This regex matches any Vercel deployment URL (e.g., your-project-xxxx.vercel.app)
            // You might need to adjust this if you have custom preview domains
            value: "(.*)\\.vercel\\.app",
          },
        ],
        destination: "https://www.xmf.co.in/:path*",
        permanent: true, // Use 308 for permanent redirect
      },
    ];
  },
};

export default nextConfig
