"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import ImageHover from "@/components/image-hover"

// Gallery images (placeholders for now)
const galleryImages = [
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Taekwon-Do class in action",
    category: "Classes",
  },
  {
    src: "/placeholder.svg?height=800&width=600",
    alt: "Bo-Staff training session",
    category: "Classes",
  },
  {
    src: "/placeholder.svg?height=600&width=600",
    alt: "Students practicing kicks",
    category: "Training",
  },
  {
    src: "/placeholder.svg?height=800&width=800",
    alt: "Championship award ceremony",
    category: "Events",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Group photo after tournament",
    category: "Events",
  },
  {
    src: "/placeholder.svg?height=800&width=600",
    alt: "Self-defense workshop",
    category: "Workshops",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Children's martial arts class",
    category: "Classes",
  },
  {
    src: "/placeholder.svg?height=800&width=800",
    alt: "Belt promotion ceremony",
    category: "Events",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Sparring practice",
    category: "Training",
  },
  {
    src: "/placeholder.svg?height=800&width=600",
    alt: "Meditation session",
    category: "Training",
  },
  {
    src: "/placeholder.svg?height=600&width=600",
    alt: "Instructor demonstration",
    category: "Events",
  },
  {
    src: "/placeholder.svg?height=800&width=800",
    alt: "Team building exercise",
    category: "Workshops",
  },
]

type Category = "All" | "Classes" | "Events" | "Training" | "Workshops"

export function GalleryGrid() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<Category>("All")

  const categories: Category[] = ["All", "Classes", "Events", "Training", "Workshops"]

  const filteredImages =
    activeCategory === "All" ? galleryImages : galleryImages.filter((img) => img.category === activeCategory)

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-1 md:gap-2 mb-6 md:mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-2 py-1 md:px-4 md:py-2 rounded-md transition-colors text-xs md:text-sm",
              activeCategory === category ? "bg-red-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
        {filteredImages.map((image, index) => (
          <div
            key={index}
            className="aspect-square overflow-hidden rounded-lg cursor-pointer"
            onClick={() => setSelectedImage(index)}
          >
            <ImageHover
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="h-full w-full"
              effect="zoom"
              overlayContent={
                <div className="text-center text-white p-4">
                  <p className="font-medium">{image.alt}</p>
                  <span className="text-sm text-red-400">{image.category}</span>
                </div>
              }
            />
            <div className="absolute bottom-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
              {image.category}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl max-h-[90vh]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="relative w-full h-full">
              <Image
                src={filteredImages[selectedImage].src || "/placeholder.svg"}
                alt={filteredImages[selectedImage].alt}
                width={1200}
                height={800}
                className="mx-auto max-h-[80vh] w-auto object-contain"
              />
            </div>

            <div className="mt-4 text-center">
              <h3 className="text-white text-lg">{filteredImages[selectedImage].alt}</h3>
              <p className="text-gray-300">{filteredImages[selectedImage].category}</p>
            </div>

            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex justify-between w-full px-4">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1))
                }}
                className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
                aria-label="Previous image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1))
                }}
                className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
                aria-label="Next image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
