"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Footer } from "@/components/footer"
import { Preloader } from "@/components/preloader"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CustomCursor } from "@/components/custom-cursor"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Don't show navbar on sign in and sign up pages
  const isAuthPage = ["/signin", "/signup", "/reset-password", "/update-password"].includes(pathname)

  return (
    <body className="min-h-screen bg-background font-sans antialiased">
      <CustomCursor />

      {loading ? (
        <Preloader />
      ) : (
        <>
          <AnimatePresence mode="wait">
            <motion.main
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.main>
          </AnimatePresence>

          <Footer />
          <WhatsAppButton phoneNumber="+918884503703" />
        </>
      )}
    </body>
  )
}
