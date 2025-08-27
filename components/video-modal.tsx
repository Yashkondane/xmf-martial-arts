"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export function VideoModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          className="rounded-full bg-red-600 p-4 text-white hover:bg-red-700 transition-colors"
          aria-label="Play video"
        >
          <Play className="h-8 w-8" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] p-0 bg-black">
        <div className="aspect-video w-full">
          {isOpen && (
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/cP7_NivVZEg?start=38"
              title="XMF Martial Arts Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="aspect-video"
            ></iframe>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
