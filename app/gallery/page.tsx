import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GalleryGrid } from "@/components/gallery-grid"

export default function Gallery() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        <section className="py-16 bg-black text-white">
          <div className="container">
            <h1 className="text-4xl font-bold text-center mb-4">Photo Gallery</h1>
            <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12">
              Explore our classes, events, and training sessions through our photo gallery. Get a glimpse of the
              XMF-EXTREME experience.
            </p>

            <GalleryGrid />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
