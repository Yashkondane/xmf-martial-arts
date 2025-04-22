"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Instructor {
  name: string
  title: string
  credential: string
  imageUrl: string
  quote: string
}

const instructors: Instructor[] = [
  {
    name: "Mohammed Ismail",
    title: "Senior Instructor",
    credential: "1st DAN Taekwondo Black Belt",
    imageUrl: "/placeholder.svg?height=200&width=200",
    quote:
      "Martial arts is not just about fighting, it's about building character and discipline that lasts a lifetime.",
  },
  {
    name: "Nilesh Shahi",
    title: "Senior Instructor",
    credential: "1st DAN Taekwondo Black Belt",
    imageUrl: "/placeholder.svg?height=200&width=200",
    quote: "I believe in pushing my students beyond their limits so they can discover their true potential.",
  },
  {
    name: "MD Ikram Ulla",
    title: "Senior Instructor",
    credential: "1st DAN Taekwondo Black Belt",
    imageUrl: "/placeholder.svg?height=200&width=200",
    quote: "The journey of martial arts begins with respect and ends with self-mastery.",
  },
  {
    name: "Janani MJ",
    title: "Senior Instructor",
    credential: "1st DAN Taekwondo Black Belt",
    imageUrl: "/placeholder.svg?height=200&width=200",
    quote: "Teaching martial arts is my passion. Seeing students grow in confidence and skill is the greatest reward.",
  },
  {
    name: "Aliya Siddiqui",
    title: "Senior Instructor",
    credential: "1st DAN Taekwondo Black Belt",
    imageUrl: "/placeholder.svg?height=200&width=200",
    quote: "Every kick, every punch, every movement is a step toward perfection of both body and mind.",
  },
  {
    name: "Nashra Fathima",
    title: "National Gold Medalist",
    credential: "1st DAN Taekwondo Black Belt",
    imageUrl: "/placeholder.svg?height=200&width=200",
    quote:
      "Competing taught me that the biggest opponent is always yourself. Overcome that, and you can achieve anything.",
  },
]

export function InstructorCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const totalInstructors = instructors.length

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalInstructors)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalInstructors) % totalInstructors)
  }

  const getVisibleInstructors = () => {
    const prev = (currentIndex - 1 + totalInstructors) % totalInstructors
    const next = (currentIndex + 1) % totalInstructors
    return [prev, currentIndex, next]
  }

  const visibleInstructors = getVisibleInstructors()

  return (
    <div className="relative w-full py-12">
      <h2 className="text-3xl font-bold text-center text-white mb-12">PROFESSIONAL INSTRUCTORS</h2>

      <div className="relative h-[500px] md:h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {visibleInstructors.map((index, i) => {
            const instructor = instructors[index]
            const isCenter = i === 1

            return (
              <div
                key={index}
                className={cn(
                  "absolute transition-all duration-500 ease-in-out bg-white rounded-lg shadow-lg",
                  isCenter
                    ? "z-20 w-full max-w-xl opacity-100 scale-100"
                    : i === 0
                      ? "z-10 w-full max-w-md -translate-x-[70%] opacity-70 scale-90"
                      : "z-10 w-full max-w-md translate-x-[70%] opacity-70 scale-90",
                )}
              >
                <div className="p-8 flex flex-col items-center text-center">
                  <div className="relative w-24 h-24 mb-4 -mt-16">
                    <div className="absolute inset-0 rounded-full bg-white p-1">
                      <div className="relative w-full h-full overflow-hidden rounded-full border-2 border-red-600">
                        <Image
                          src={instructor.imageUrl || "/placeholder.svg"}
                          alt={instructor.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-black mb-1">{instructor.name}</h3>
                  <p className="text-red-600 font-medium mb-1">{instructor.title}</p>
                  <p className="text-gray-600 text-sm mb-4">{instructor.credential}</p>

                  <p className="text-gray-800 italic">"{instructor.quote}"</p>
                </div>
              </div>
            )
          })}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {instructors.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-colors",
              index === currentIndex ? "bg-red-600" : "bg-gray-600 hover:bg-gray-500",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
