"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SchedulePopupProps {
  isOpen: boolean
  onClose: () => void
}

export function SchedulePopup({ isOpen, onClose }: SchedulePopupProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)

      // Auto-dismiss after 12 seconds
      const timer = setTimeout(() => {
        onClose()
      }, 12000)

      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300) // Wait for animation to complete
  }

  if (!isOpen) return null

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
      )}
    >
      <div className="bg-white border-t border-gray-200 shadow-lg p-4 md:p-6 rounded-t-lg mx-auto max-w-7xl">
        <div className="flex items-start justify-between">
          <p className="text-black text-sm md:text-base pr-8">
            For <span className="text-red-600 font-medium">pricing and schedules</span>, please contact us via phone,
            email, or social media. We're happy to help!
          </p>
          <button
            onClick={handleClose}
            className="flex-shrink-0 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
            aria-label="Close popup"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
