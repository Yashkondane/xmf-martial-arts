"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const images = [
  { src: "/images/slider-1.jpg", alt: "Group of martial arts students and instructors" },
  { src: "/images/slider-2.jpg", alt: "Close-up of martial arts black belts" },
  { src: "/images/slider-3.jpg", alt: "Female martial artist performing a high kick" },
  { src: "/images/slider-4.jpg", alt: "Male martial artist performing a jumping split kick" },
]

export function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(new Array(images.length).fill(false))
  const [imageErrors, setImageErrors] = useState<boolean[]>(new Array(images.length).fill(false))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [mounted])

  const handleImageLoad = (index: number) => {
    setImagesLoaded((prev) => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })
  }

  const handleImageError = (index: number) => {
    setImageErrors((prev) => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })
  }

  if (!mounted) {
    return (
      <div className="relative w-full h-full overflow-hidden bg-gray-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-900">
      {!imagesLoaded[currentIndex] && !imageErrors[currentIndex] && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}

      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            fill
            priority={index === 0}
            quality={90}
            sizes="100vw"
            className="object-cover object-center"
            onLoad={() => handleImageLoad(index)}
            onError={() => handleImageError(index)}
          />
        </div>
      ))}
    </div>
  )
}
