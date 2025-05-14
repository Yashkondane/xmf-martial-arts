import { Navbar } from "@/components/navbar"
import { GalleryGrid } from "@/components/gallery-grid"
import { TextAnimation } from "@/components/text-animation"

export default function Gallery() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        <section className="py-16 bg-black text-white">
          <div className="container">
            <TextAnimation text="Photo Gallery" type="gradient" className="text-4xl font-bold text-center mb-4" />
            <TextAnimation
              text="Explore our classes, events, and training sessions through our photo gallery. Get a glimpse of the XMF-EXTREME experience."
              type="fade"
              className="text-center text-gray-300 max-w-2xl mx-auto mb-12"
              delay={0.3}
            />

            <GalleryGrid />
          </div>
        </section>
      </main>
    </div>
  )
}
