import type React from "react"
import ClientLayout from "./ClientLayout"
import "./globals.css" // Import globals.css at the top of the file

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>XMF-EXTREME MARTIAL ARTS AND FITNESS</title>
        <meta
          name="description"
          content="San Francisco & Millbrae Martial Arts & Fitness - Live Your Best Life with XMF-EXTREME"
        />

        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="XMF-EXTREME MARTIAL ARTS AND FITNESS" />
        <meta
          property="og:description"
          content="San Francisco & Millbrae Martial Arts & Fitness - Live Your Best Life with XMF-EXTREME"
        />
        <meta property="og:image" content="https://www.xmf.co.in/images/xmf-logo-white-bg.jpeg" />
        <meta property="og:url" content="https://www.xmf.co.in" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="XMF-EXTREME MARTIAL ARTS AND FITNESS" />
        <meta
          name="twitter:description"
          content="San Francisco & Millbrae Martial Arts & Fitness - Live Your Best Life with XMF-EXTREME"
        />
        <meta name="twitter:image" content="https://www.xmf.co.in/images/xmf-logo-white-bg.jpeg" />

        {/* Additional SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="canonical" href="https://www.xmf.co.in" />
      </head>
      <ClientLayout>{children}</ClientLayout>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
