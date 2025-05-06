import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProgramSectionProps {
  title: string
  description: string
  imageUrl: string
  reverse?: boolean
}

export function ProgramSection({ title, description, imageUrl, reverse = false }: ProgramSectionProps) {
  return (
    <div className={cn("flex flex-col md:flex-row items-center gap-8 mb-16", reverse && "md:flex-row-reverse")}>
      <div className="flex-1">
        <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
      <div className="flex-1 relative h-64 md:h-80 w-full overflow-hidden rounded-lg border border-red-600">
        <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
    </div>
  )
}
