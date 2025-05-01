"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { motion } from "framer-motion"

interface PreloaderProps {
  isLoading?: boolean
}

export function Preloader({ isLoading: externalLoading }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // If external loading state is provided, use it
    if (externalLoading !== undefined) {
      setIsLoading(externalLoading)
      return
    }

    // Otherwise use internal timer
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [externalLoading])

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500",
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
    >
      <div className="flex flex-col items-center">
        <motion.div
          className="relative w-32 h-32 mb-6"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Image src="/images/xmf-logo-black-bg.jpeg" alt="XMF Logo" fill className="object-contain rounded-full" />
        </motion.div>
        <motion.h1
          className="text-3xl font-bold text-white mb-4"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          XMF-EXTREME
        </motion.h1>
        <div className="w-48 h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-red-600"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  )
}
