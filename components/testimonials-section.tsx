"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Angel Peeter",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1718305378493.jpg-yculrbzjCOGpCYZHjH8pNtntCVO6Qc.jpeg",
    quote:
      "It was an honor to learn Taekwondo under the guidance of Master Farhan. His teaching method is both effective and engaging, making each class a valuable learning experience. The atmosphere of learning is welcoming, fostering a sense of community. I'm grateful for the knowledge and skills I've gained, and I appreciate Master Farhan's dedication to teaching. Thank you for your guidance and support.",
  },
  {
    id: 2,
    name: "Hemanth Kumar",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo-1598096969068-7f52cac10c83.jpg-7Z38JwEod2MVZzvTvU1fnl5IWbI251.jpeg",
    quote:
      "A big thanks to the team at XMF Martial Arts and Fitness. They helped me lose 7kg in just 3 months! They taught me effective self-defense techniques and fighting drills.",
  },
  {
    id: 3,
    name: "Sandip Dey",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images%20%284%29.jpg-CxexapThnRxmtX1FIS4GSUYW6WuIfR.jpeg",
    quote:
      "Incredible experience. Very friendly trainer. Amazing learning experience. Classes are well-structured, catering to all skill levels and fostering both physical and personal growth. Overall, it's a fantastic place to train and improve in Taekwondo.",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const totalTestimonials = testimonials.length

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalTestimonials)
    }, 8000)

    return () => clearInterval(interval)
  }, [totalTestimonials])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalTestimonials)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalTestimonials) % totalTestimonials)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className="py-16 bg-black text-white">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Our Clients Say</h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Slider */}
          <div className="overflow-hidden">
            <div
              className="transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              <div className="flex">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="flex flex-col items-center">
                      <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-red-600">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-gray-300 text-center italic mb-6 max-w-2xl">"{testimonial.quote}"</p>
                      <h3 className="text-xl font-bold">{testimonial.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dot Navigation */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-colors",
                  index === currentIndex ? "bg-red-600" : "bg-gray-600 hover:bg-gray-500",
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
