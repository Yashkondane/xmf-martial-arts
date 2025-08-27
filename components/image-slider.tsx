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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000) // Change image every 5 seconds
    return () => clearInterval(interval)
  }, [])

  const handleImageLoad = (index: number) => {
    setImagesLoaded((prev) => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-900">
      {/* Loading placeholder */}
      {!imagesLoaded[currentIndex] && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}

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
            quality={85} // Optimize quality vs file size
            sizes="100vw" // Specify sizes for better optimization
            className="object-cover object-center"
            onLoad={() => handleImageLoad(index)}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>
      ))}

      {/* Preload next images */}
      {images.map(
        (image, index) =>
          index !== currentIndex && (
            <div key={`preload-${index}`} className="hidden">
              <Image
                src={image.src || "/placeholder.svg"}
                alt=""
                width={1}
                height={1}
                priority={false}
                onLoad={() => handleImageLoad(index)}
              />
            </div>
          ),
      )}
    </div>
  )
}
