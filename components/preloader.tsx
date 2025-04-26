"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time (you can remove this in production)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500",
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
    >
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 mb-6">
          <Image src="/placeholder.svg?height=200&width=200" alt="XMF Logo" fill className="object-contain" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">XMF-EXTREME</h1>
        <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-red-600 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
