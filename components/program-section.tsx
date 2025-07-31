import { cn } from "@/lib/utils"
import { TextAnimation } from "@/components/text-animation"
import ImageHover from "@/components/image-hover"

interface ProgramSectionProps {
  title: string
  description: string
  imageUrl: string
  reverse?: boolean
}

export function ProgramSection({ title, description, imageUrl, reverse = false }: ProgramSectionProps) {
  return (
    <div className={cn("flex flex-col md:flex-row items-center gap-8 mb-16 py-8", reverse && "md:flex-row-reverse")}>
      <div className="flex-1 w-full">
        <TextAnimation text={title} type="highlight" className="text-2xl font-bold mb-4 text-white" />
        <TextAnimation text={description} type="fade" className="text-gray-300" delay={0.3} />
      </div>
      <div className="flex-1 h-64 md:h-80 w-full mt-6 md:mt-0">
        <ImageHover
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="rounded-lg h-full" // Removed border border-red-600
          effect="zoom"
          overlayContent={
            <div className="text-center text-white p-4">
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-sm">Click to learn more</p>
            </div>
          }
        />
      </div>
    </div>
  )
}
