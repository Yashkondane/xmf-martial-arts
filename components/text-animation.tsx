"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

type AnimationType = "fade" | "slide" | "highlight" | "reveal" | "gradient" | "typewriter"

interface TextAnimationProps {
  text: string
  type?: AnimationType
  delay?: number
  duration?: number
  className?: string
  once?: boolean
  staggerChildren?: boolean
  color?: string
}

export function TextAnimation({
  text,
  type = "fade",
  delay = 0,
  duration = 0.5,
  className = "",
  once = true,
  staggerChildren = false,
  color = "#dc2626", // red-600
}: TextAnimationProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once, threshold: 0.2 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [controls, inView, once])

  // For typewriter effect
  if (type === "typewriter") {
    return (
      <div className={className} ref={ref}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: "100%" } : { width: 0 }}
          transition={{
            duration: duration * 2,
            delay,
            ease: "easeInOut",
          }}
          className="overflow-hidden whitespace-nowrap"
        >
          {text}
        </motion.div>
      </div>
    )
  }

  // For gradient effect
  if (type === "gradient") {
    return (
      <motion.div
        ref={ref}
        className={`${className} bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-white`}
        initial={{ opacity: 0 }}
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration, delay },
          },
        }}
      >
        {text}
      </motion.div>
    )
  }

  // For staggered animations (word by word or letter by letter)
  if (staggerChildren) {
    const words = text.split(" ")

    return (
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: delay,
            },
          },
        }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-1"
            variants={{
              hidden: {
                opacity: 0,
                y: type === "slide" ? 20 : 0,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: duration,
                  ease: "easeOut",
                },
              },
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    )
  }

  // For highlight effect
  if (type === "highlight") {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration: duration * 0.5, delay },
          },
        }}
      >
        <motion.span
          initial={{ backgroundSize: "0% 100%" }}
          animate={inView ? { backgroundSize: "100% 100%" } : { backgroundSize: "0% 100%" }}
          transition={{ duration: duration * 1.5, delay: delay + duration * 0.5 }}
          style={{
            backgroundImage: `linear-gradient(transparent 60%, ${color}40 40%)`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "0% 100%",
            display: "inline",
          }}
        >
          {text}
        </motion.span>
      </motion.div>
    )
  }

  // For reveal effect
  if (type === "reveal") {
    return (
      <div className={`${className} relative overflow-hidden`} ref={ref}>
        <motion.div
          initial={{ opacity: 1 }}
          animate={controls}
          variants={{
            hidden: { opacity: 1 },
            visible: { opacity: 1 },
          }}
        >
          {text}
        </motion.div>
        <motion.div
          initial={{ left: 0 }}
          animate={inView ? { left: "100%" } : { left: 0 }}
          transition={{ duration, delay, ease: "easeInOut" }}
          className="absolute inset-0 bg-red-600"
        />
      </div>
    )
  }

  // Default fade or slide animation
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {
          opacity: 0,
          y: type === "slide" ? 20 : 0,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration,
            delay,
            ease: "easeOut",
          },
        },
      }}
    >
      {text}
    </motion.div>
  )
}
