"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"

interface ProgramSectionProps {
  title: string
  description: string
  imageUrl: string
  reverse?: boolean
}

export function ProgramSection({ title, description, imageUrl, reverse = false }: ProgramSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (inView) {
      setIsVisible(true)
    }
  }, [inView])

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col md:flex-row items-center gap-8 mb-16 opacity-0 transition-all duration-1000",
        isVisible && "opacity-100",
        reverse && "md:flex-row-reverse",
        isVisible && !reverse ? "translate-x-0" : !isVisible && !reverse ? "-translate-x-20" : "",
        isVisible && reverse ? "translate-x-0" : !isVisible && reverse ? "translate-x-20" : "",
      )}
    >
      <div className="flex-1">
        <h3 className="text-2xl font-bold mb-4 text-white text-animate">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
      <div className="flex-1 relative h-64 md:h-80 w-full overflow-hidden rounded-lg border border-red-600 image-hover">
        <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
    </div>
  )
}
