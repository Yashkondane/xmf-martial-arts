"use client"

import { useRef, useEffect, type ReactNode } from "react"
import { motion, useInView, useAnimation, type Variant } from "framer-motion"

type AnimationVariant =
  | "fadeIn"
  | "fadeInUp"
  | "fadeInDown"
  | "fadeInLeft"
  | "fadeInRight"
  | "zoomIn"
  | "flipIn"
  | "rotateIn"
  | "bounceIn"
  | "slideIn"

interface ScrollAnimationProps {
  children: ReactNode
  variant?: AnimationVariant
  delay?: number
  duration?: number
  threshold?: number
  className?: string
  once?: boolean
}

const variants = {
  hidden: {
    opacity: 0,
    y: 0,
    x: 0,
    scale: 1,
    rotate: 0,
  },
  fadeIn: {
    opacity: 1,
  },
  fadeInUp: {
    opacity: 1,
    y: 0,
  },
  fadeInDown: {
    opacity: 1,
    y: 0,
  },
  fadeInLeft: {
    opacity: 1,
    x: 0,
  },
  fadeInRight: {
    opacity: 1,
    x: 0,
  },
  zoomIn: {
    opacity: 1,
    scale: 1,
  },
  flipIn: {
    opacity: 1,
    rotateY: 0,
  },
  rotateIn: {
    opacity: 1,
    rotate: 0,
  },
  bounceIn: {
    opacity: 1,
    y: 0,
  },
  slideIn: {
    opacity: 1,
    x: 0,
  },
}

const getInitialState = (variant: AnimationVariant): Variant => {
  switch (variant) {
    case "fadeIn":
      return { opacity: 0 }
    case "fadeInUp":
      return { opacity: 0, y: 50 }
    case "fadeInDown":
      return { opacity: 0, y: -50 }
    case "fadeInLeft":
      return { opacity: 0, x: -50 }
    case "fadeInRight":
      return { opacity: 0, x: 50 }
    case "zoomIn":
      return { opacity: 0, scale: 0.5 }
    case "flipIn":
      return { opacity: 0, rotateY: 90 }
    case "rotateIn":
      return { opacity: 0, rotate: -45 }
    case "bounceIn":
      return { opacity: 0, y: 50 }
    case "slideIn":
      return { opacity: 0, x: -100 }
    default:
      return { opacity: 0 }
  }
}

export function ScrollAnimation({
  children,
  variant = "fadeInUp",
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  className = "",
  once = true,
}: ScrollAnimationProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once, threshold })

  useEffect(() => {
    if (inView) {
      controls.start(variant)
    } else if (!once) {
      controls.start("hidden")
    }
  }, [controls, inView, variant, once])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: getInitialState(variant),
        [variant]: variants[variant],
      }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
