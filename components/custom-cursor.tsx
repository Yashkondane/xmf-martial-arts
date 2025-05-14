"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement
      const clickableElements = ["A", "BUTTON", "INPUT", "SELECT", "TEXTAREA"]
      setIsPointer(clickableElements.includes(target.tagName) || window.getComputedStyle(target).cursor === "pointer")
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseLeave = () => setIsHidden(true)
    const handleMouseEnter = () => setIsHidden(false)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [])

  // Only show custom cursor on desktop
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null
  }

  return (
    <>
      <style jsx global>{`
        body {
          cursor: none;
        }
        a, button, input, select, textarea, [role="button"], [role="link"] {
          cursor: none !important;
        }
      `}</style>

      {/* Outer cursor circle */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full mix-blend-difference"
        style={{
          left: position.x,
          top: position.y,
          backgroundColor: isPointer ? "transparent" : "white",
          border: isPointer ? "2px solid white" : "none",
          opacity: isHidden ? 0 : 1,
        }}
        animate={{
          height: isPointer ? 40 : isClicking ? 16 : 24,
          width: isPointer ? 40 : isClicking ? 16 : 24,
          x: isPointer ? -20 : -12,
          y: isPointer ? -20 : -12,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />

      {/* Inner cursor dot */}
      <motion.div
        className="pointer-events-none fixed z-[9999] h-2 w-2 rounded-full bg-white mix-blend-difference"
        style={{
          left: position.x - 4,
          top: position.y - 4,
          opacity: isHidden ? 0 : isPointer ? 0 : 1,
        }}
        animate={{
          scale: isClicking ? 0.5 : 1,
        }}
      />
    </>
  )
}
