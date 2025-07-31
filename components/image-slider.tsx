"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const images = [
  "/images/slider-1.jpg", // New group photo with confident poses
  "/images/slider-2.jpg", // Close-up of Taekwon-Do belts
  "/images/slider-3.jpg", // New female student high kick technique
  "/images/slider-4.jpg", // Male student performing jumping split kick
]

export function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-full w-full overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image || "/placeholder.svg"}
            alt={`XMF Martial Arts slide ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  )
}
