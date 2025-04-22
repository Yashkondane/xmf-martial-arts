"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { ImageSlider } from "@/components/image-slider"
import { VideoModal } from "@/components/video-modal"
import { ProgramSection } from "@/components/program-section"
import { ContactSection } from "@/components/contact-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AboutSection } from "@/components/about-section"
import { InstructorCarousel } from "@/components/instructor-carousel"
import { AchievementsSection } from "@/components/achievements-section"
import { SchedulePopup } from "@/components/schedule-popup"

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const contactRef = useRef<HTMLElement>(null)

  const handleScheduleClick = () => {
    setIsPopupOpen(true)

    // Scroll to contact section
    contactRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="XMF Logo"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <span className="text-xl font-bold">XMF-EXTREME</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="#" className="transition-colors hover:text-foreground/80">
              Home
            </Link>
            <Link href="#about" className="transition-colors hover:text-foreground/80">
              About XMF
            </Link>
            <Link href="#programs" className="transition-colors hover:text-foreground/80">
              Programs
            </Link>
            <Link href="#achievements" className="transition-colors hover:text-foreground/80">
              Achievements
            </Link>
            <Link href="#contact" className="transition-colors hover:text-foreground/80">
              Contact Us
            </Link>
          </nav>

          <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleScheduleClick}>
            SCHEDULE & PRICING
          </Button>
        </div>
      </header>

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
              <Button variant="outline" className="bg-white text-black hover:bg-gray-100 min-w-[200px]">
                LEARN MORE
              </Button>
            </div>
          </div>
        </section>

        <AboutSection />

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

        <section ref={contactRef} id="contact">
          <ContactSection />
        </section>
      </main>

      <footer className="bg-black text-white py-6">
        <div className="container text-center">
          <p>© {new Date().getFullYear()} XMF-EXTREME MARTIAL ARTS AND FITNESS. All rights reserved.</p>
        </div>
      </footer>

      <SchedulePopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  )
}
