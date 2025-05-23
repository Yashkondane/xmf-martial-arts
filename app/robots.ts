import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  // Make sure this is exactly your production domain
  const baseUrl = "https://www.xmf.co.in"

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/signin", "/signup", "/reset-password", "/update-password", "/dashboard"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
