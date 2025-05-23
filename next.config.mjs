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
}

export default nextConfig
