"use client"

import { useState, useEffect } from "react"
import { MessageCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface WhatsAppButtonProps {
  phoneNumber: string
}

export function WhatsAppButton({ phoneNumber }: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phoneNumber.replace(/\+/g, "")}`, "_blank")
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 flex items-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleWhatsAppClick}
        >
          <motion.div
            className="relative flex h-12 w-12 md:h-14 md:w-14 cursor-pointer items-center justify-center rounded-full bg-green-500 text-white shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={`WhatsApp: ${phoneNumber}`}
          >
            <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
            <motion.div
              className="absolute -inset-1 rounded-full"
              animate={{
                boxShadow: ["0 0 0 0 rgba(72, 187, 120, 0.7)", "0 0 0 10px rgba(72, 187, 120, 0)"],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.5,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <AnimatePresence>
            {isHovered && (
              <motion.span
                className="ml-2 text-white font-medium bg-green-500 rounded-r-full py-2 pr-4 hidden md:block"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                WhatsApp Us
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WhatsAppButton
