import Link from "next/link"
import { ImageSlider } from "@/components/image-slider"
import { VideoModal } from "@/components/video-modal"
import { ProgramSection } from "@/components/program-section"
import { ContactSection } from "@/components/contact-section"
import { Button } from "@/components/ui/button"
import { InstructorCarousel } from "@/components/instructor-carousel"
import { AchievementsSection } from "@/components/achievements-section"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        <section className="relative h-[80vh] w-full">
          <ImageSlider />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 bg-black/40">
            <div className="mb-8">
              <VideoModal />
            </div>

            <h1 className="text-2xl md:text-4xl font-bold mb-2">SAN FRANCISCO & MILLBRAE MARTIAL ARTS & FITNESS</h1>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">LIVE YOUR BEST LIFE WITH XMF-EXTREME</h2>
            <p className="max-w-2xl mb-8 text-lg">
              Unveiling the Art of Martial Arts: A Journey of Discipline, Strength, and Self-Discovery
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#programs">
                <Button className="bg-red-600 hover:bg-red-700 text-white min-w-[200px]">SELECT A PROGRAM</Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="bg-white text-black hover:bg-gray-100 min-w-[200px]">
                  LEARN MORE
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="programs" className="py-16 bg-black text-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Our Programs</h2>

            <ProgramSection
              title="Taekwon-Do"
              description="Taekwon-Do is a Korean martial art characterized by its emphasis on head-height kicks, jumping and spinning kicks, and fast kicking techniques. Though training in Taekwon-Do will provide you with an effective method of self-defense, this is only one of its many facets. It is also an art, a way of life, and a sport."
              imageUrl="/placeholder.svg?height=400&width=600"
            />

            <ProgramSection
              title="Bo-Staff"
              description="Bo-Staff training is an ancient martial art weapon practice that enhances coordination, strength, and focus. Our Bo-Staff program teaches traditional techniques combined with modern applications, helping students develop precision, discipline, and a deeper connection to martial arts heritage."
              imageUrl="/placeholder.svg?height=400&width=600"
              reverse
            />

            <ProgramSection
              title="Calisthenics"
              description="Our Calisthenics program focuses on building functional strength, flexibility, and endurance using bodyweight exercises. This training complements martial arts practice by developing core stability, improving movement patterns, and enhancing overall physical conditioning without the need for equipment."
              imageUrl="/placeholder.svg?height=400&width=600"
            />
          </div>
        </section>

        <section id="instructors" className="py-16 bg-black">
          <div className="container">
            <InstructorCarousel />
          </div>
        </section>

        <AchievementsSection />

        <section id="contact">
          <ContactSection />
        </section>
      </main>

      <Footer />
    </div>
  )
}
