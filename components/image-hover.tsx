"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type HoverEffectType = "zoom" | "overlay" | "slide" | "flip" | "tilt" | "reveal" | "blur" | "grayscale" | "none"

interface ImageHoverProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  imageClassName?: string
  effect?: HoverEffectType
  overlayContent?: React.ReactNode
  priority?: boolean
  fill?: boolean
  onClick?: () => void
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down"
}

export default function ImageHover({
  src,
  alt,
  width,
  height,
  className = "",
  imageClassName = "",
  effect = "none",
  overlayContent,
  priority = false,
  fill = false,
  onClick,
  objectFit = "cover", // Default to cover if not specified
}: ImageHoverProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  const containerClasses = cn("overflow-hidden relative w-full h-full", onClick && "cursor-pointer", className)

  const imageClasses = cn(
    "transition-all duration-500",
    effect === "zoom" && "hover:scale-110",
    effect === "blur" && "hover:scale-105",
    effect === "grayscale" && "hover:grayscale",
    imageClassName,
    objectFit ? `object-${objectFit}` : fill ? "object-cover" : "object-contain",
  )

  const overlayVariants = {
    hidden: {
      opacity: 0,
      y: effect === "slide" ? 50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  const flipVariants = {
    initial: { rotateY: 0 },
    flipped: { rotateY: 180 },
  }

  const tiltAmount = 10

  const revealVariants = {
    hidden: { clipPath: "inset(0 100% 0 0)" },
    visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: 0.5 } },
  }

  const blurVariants = {
    hidden: { filter: "blur(0px)" },
    visible: { filter: "blur(4px)", transition: { duration: 0.3 } },
  }

  const effectClasses = {
    zoom: isHovered ? "scale-105" : "scale-100",
    tilt: isHovered ? "rotate-1" : "rotate-0",
    none: "",
  }

  return (
    <div className={containerClasses} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={onClick}>
      {effect === "flip" ? (
        <motion.div
          className="relative w-full h-full"
          animate={isHovered ? "flipped" : "initial"}
          variants={flipVariants}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute w-full h-full backface-visibility-hidden">
            <Image
              src={src || "/placeholder.svg"}
              alt={alt}
              width={width}
              height={height}
              className={imageClasses}
              priority={priority}
              fill={fill}
            />
          </div>
          <div
            className="absolute w-full h-full backface-visibility-hidden bg-black bg-opacity-70 flex items-center justify-center p-4"
            style={{ transform: "rotateY(180deg)" }}
          >
            {overlayContent}
          </div>
        </motion.div>
      ) : effect === "tilt" ? (
        <motion.div
          className="w-full h-full"
          whileHover={{
            rotateX: tiltAmount,
            rotateY: tiltAmount,
            scale: 1.05,
          }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            width={width}
            height={height}
            className={imageClasses}
            priority={priority}
            fill={fill}
          />
          {overlayContent && (
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {overlayContent}
            </motion.div>
          )}
        </motion.div>
      ) : effect === "reveal" ? (
        <>
          <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            width={width}
            height={height}
            className={imageClasses}
            priority={priority}
            fill={fill}
          />
          {overlayContent && (
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center p-2 md:p-4 text-center"
              initial="hidden"
              animate={isHovered ? "visible" : "hidden"}
              variants={revealVariants}
            >
              {overlayContent}
            </motion.div>
          )}
        </>
      ) : effect === "blur" ? (
        <>
          <motion.div animate={isHovered ? "visible" : "hidden"} variants={blurVariants}>
            <Image
              src={src || "/placeholder.svg"}
              alt={alt}
              width={width}
              height={height}
              className={imageClasses}
              priority={priority}
              fill={fill}
            />
          </motion.div>
          {overlayContent && (
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {overlayContent}
            </motion.div>
          )}
        </>
      ) : effect === "grayscale" ? (
        <div className="relative group">
          <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            width={width}
            height={height}
            className={imageClasses}
            priority={priority}
            fill={fill}
          />
          {overlayContent && (
            <div
              className={cn(
                "absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300",
                isHovered ? "opacity-100" : "opacity-0",
              )}
            >
              {overlayContent}
            </div>
          )}
        </div>
      ) : (
        <>
          <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            width={width}
            height={height}
            className={cn(
              "transition-transform duration-300 ease-in-out",
              effectClasses[effect],
              `object-${objectFit}`, // Apply objectFit here
            )}
            priority={priority}
            fill={fill}
          />
          {overlayContent && (
            <motion.div
              className={cn(
                "absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300",
                isHovered ? "opacity-100" : "opacity-0",
              )}
            >
              {overlayContent}
            </motion.div>
          )}
        </>
      )}
    </div>
  )
}
