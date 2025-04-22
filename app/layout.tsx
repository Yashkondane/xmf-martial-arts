import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

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
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
