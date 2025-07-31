import Link from "next/link"
import Image from "next/image" // Import Image component
import { ImageSlider } from "@/components/image-slider"
import { VideoModal } from "@/components/video-modal"
import { ContactSection } from "@/components/contact-section"
import { Button } from "@/components/ui/button"
import { InstructorCarousel } from "@/components/instructor-carousel"
import { AchievementsSection } from "@/components/achievements-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { TextAnimation } from "@/components/text-animation"
import { Navbar } from "@/components/navbar"

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

            <TextAnimation
              text="XMF – EXTREME MARTIAL ARTS AND FITNESS"
              type="fade"
              className="text-2xl md:text-4xl font-bold mb-2"
            />

            <TextAnimation
              text="LIVE YOUR BEST LIFE WITH XMF-EXTREME"
              type="reveal"
              className="text-3xl md:text-5xl font-bold mb-4"
              delay={0.3}
            />

            <TextAnimation
              text="Unveiling the Art of Martial Arts: A Journey of Discipline, Strength, and Self-Discovery"
              type="fade"
              className="max-w-2xl mb-8 text-lg"
              delay={0.6}
            />

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
          <div className="container mx-auto px-4 md:px-6">
            <TextAnimation text="Our Programs" type="highlight" className="text-3xl font-bold text-center mb-12" />

            {/* Taekwon-Do Program */}
            <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
              <div className="space-y-4 fade-in">
                <TextAnimation text="Taekwon-Do" type="highlight" className="text-2xl font-bold mb-4 text-white" />
                <TextAnimation
                  text="Taekwon-Do is a Korean martial art characterized by its emphasis on head-height kicks, jumping and spinning kicks, and fast kicking techniques. Though training in Taekwon-Do will provide you with an effective method of self-defense, this is only one of its many facets. It is also an art, a way of life, and a sport."
                  type="fade"
                  className="text-gray-300"
                  delay={0.3}
                />
              </div>
              <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-lg bg-black fade-in-delay-1">
                <Image
                  src="/images/program-taekwondo.jpg"
                  alt="Taekwon-Do Program"
                  fill
                  className="object-contain object-center"
                />
              </div>
            </div>

            {/* Bo-Staff Program */}
            <div className="grid md:grid-cols-2 gap-8 items-center mb-16 md:flex-row-reverse">
              <div className="space-y-4 fade-in">
                <TextAnimation text="Bo-Staff" type="highlight" className="text-2xl font-bold mb-4 text-white" />
                <TextAnimation
                  text="Bo-Staff training is an ancient martial art weapon practice that enhances coordination, strength, and focus. Our Bo-Staff program teaches traditional techniques combined with modern applications, helping students develop precision, discipline, and a deeper connection to martial arts heritage."
                  type="fade"
                  className="text-gray-300"
                  delay={0.3}
                />
              </div>
              <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-lg bg-black fade-in-delay-1">
                <Image
                  src="/images/program-bo-staff.jpg"
                  alt="Bo-Staff Program"
                  fill
                  className="object-contain object-center"
                />
              </div>
            </div>

            {/* Calisthenics Program */}
            <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
              <div className="space-y-4 fade-in">
                <TextAnimation text="Calisthenics" type="highlight" className="text-2xl font-bold mb-4 text-white" />
                <TextAnimation
                  text="Our Calisthenics program focuses on building functional strength, flexibility, and endurance using bodyweight exercises. This training complements martial arts practice by developing core stability, improving movement patterns, and enhancing overall physical conditioning without the need for equipment."
                  type="fade"
                  className="text-gray-300"
                  delay={0.3}
                />
              </div>
              <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-lg bg-black fade-in-delay-1">
                <Image
                  src="/images/program-calisthenics.jpg"
                  alt="Calisthenics Program"
                  fill
                  className="object-contain object-center"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="instructors" className="py-16 bg-black">
          <div className="container">
            <InstructorCarousel />
          </div>
        </section>

        <AchievementsSection />

        <TestimonialsSection />

        <section id="contact">
          <ContactSection />
        </section>
      </main>
    </div>
  )
}
