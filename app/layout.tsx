import type React from "react"
import ClientLayout from "./ClientLayout"

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
      <ClientLayout>{children}</ClientLayout>
    </html>
  )
}


import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
