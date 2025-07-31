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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000) // Change image every 5 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            fill
            priority={index === 0} // Prioritize loading the first image
            className="object-cover object-center" // Apply object-cover and center for all images
          />
        </div>
      ))}
    </div>
  )
}
