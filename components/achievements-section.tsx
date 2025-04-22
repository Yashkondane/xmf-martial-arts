"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const images = [
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
]

export function AchievementsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <section id="achievements" className="py-16 bg-gray-950 text-white">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">ACHIEVEMENTS</h2>

        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 relative h-64 md:h-80 w-full overflow-hidden rounded-lg">
            {images.map((image, index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 transition-opacity duration-1000",
                  index === currentIndex ? "opacity-100" : "opacity-0",
                )}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Achievement ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}

            <div className="absolute inset-0 flex items-center justify-between px-4">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    index === currentIndex ? "bg-red-600" : "bg-gray-400",
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="flex-1">
            <p className="text-gray-300 mb-6">
              Welcome to XMF, where discipline meets determination and every kick is a step toward excellence. Founded
              on the principles of respect, perseverance, and self-improvement.
            </p>

            <h3 className="text-xl font-bold mb-4 text-red-600">ACHIEVEMENTS</h3>

            <ul className="space-y-2 text-gray-200">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span>70+ Nationals Gold Medallists</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span>178+ State level Gold Medallists</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span>Participation in 20+ National, Zonal, State and District Tournaments</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span>10+ Self Defence technique demonstrations for Women's safety</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
