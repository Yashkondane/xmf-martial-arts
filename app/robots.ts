import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://xmf-extreme.com"

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/signin", "/signup", "/reset-password", "/update-password", "/dashboard"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
