"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxProps {
  children: ReactNode
  speed?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
  offset?: number
}

export function Parallax({ children, speed = 0.5, direction = "up", className = "", offset = 300 }: ParallaxProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const distance = offset * speed

  const yTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [direction === "down" ? -distance : distance, direction === "down" ? distance : -distance],
  )
  const xTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [direction === "right" ? -distance : distance, direction === "right" ? distance : -distance],
  )

  const y = direction === "up" || direction === "down" ? yTransform : 0
  const x = direction === "left" || direction === "right" ? xTransform : 0

  return (
    <motion.div ref={ref} style={{ y, x }} className={className}>
      {children}
    </motion.div>
  )
}
