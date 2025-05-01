"use client"

import type React from "react"
import { Inter } from "next/font/google"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import "./globals.css"
import { Preloader } from "@/components/preloader"
import { useEffect, useState } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isFirstMount, setIsFirstMount] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if environment variables are available
    const checkEnv = () => {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseKey) {
        console.warn("Supabase environment variables are missing:", {
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseKey,
        })
      }
    }

    checkEnv()

    // After first mount, set to false
    const timer = setTimeout(() => {
      setIsFirstMount(false)
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <body className={inter.className}>
      <Preloader isLoading={isLoading} />
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
            delay: isFirstMount ? 0.5 : 0, // Delay only on first mount (after preloader)
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </body>
  )
}
