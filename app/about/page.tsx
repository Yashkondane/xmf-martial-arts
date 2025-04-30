import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        <section className="py-16 bg-black text-white">
          <div className="container">
            <h1 className="text-4xl font-bold text-center mb-12">About XMF</h1>

            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-300 mb-6">
                  Welcome to XMF-EXTREME, where discipline meets determination and every kick is a step toward
                  excellence. Founded on the principles of respect, perseverance, and self-improvement, our martial arts
                  academy has been training champions and building character for over a decade.
                </p>
                <p className="text-gray-300 mb-6">
                  Our journey began with a simple mission: to provide world-class martial arts training that not only
                  develops physical skills but also nurtures mental strength and personal growth. Today, we're proud to
                  have helped thousands of students achieve their goals and discover their potential.
                </p>
                <p className="text-gray-300">
                  With locations in Taverekere, Free Kick, The Iwan, and Avalahalli, we offer comprehensive programs for
                  all ages and skill levels. Whether you're looking to compete at the highest levels or simply want to
                  improve your fitness and confidence, XMF-EXTREME has a program for you.
                </p>
              </div>

              <div className="flex-1 relative h-80 w-full overflow-hidden rounded-lg border border-red-600">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="XMF Training Center"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Our Founder – Farhan Khan XMF</h2>

              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 relative h-80 w-full overflow-hidden rounded-lg border border-red-600">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="Farhan Khan XMF"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <p className="text-gray-300 mb-4">
                    Farhan Khan XMF is a seasoned martial arts coach with over 9 years of experience. A national
                    instructor, he has trained students to achieve success at state and national levels. His approach
                    blends discipline, fitness, and mental strength to build complete athletes. He holds a Black Belt in
                    ITF Taekwondo and a 3rd Dan Black Belt in Karate (WFSKO).
                  </p>
                  <p className="text-gray-300 mb-4">
                    Farhan is an active MMA fighter and a member of the Taekwondo Association of Karnataka. He also
                    claimed the Bengaluru Bodybuilding 2024 Men's Physique Title, proving his dedication to fitness.
                    With a diverse martial arts background, he provides students with practical, real-world combat
                    skills. He fosters a focused and positive training space where students of all levels thrive.
                  </p>
                  <p className="text-gray-300">
                    Known as one of Karnataka's top trainers, Farhan emphasizes respect, integrity, and perseverance. He
                    inspires students to push limits and grow both technically and mentally. His coaching style builds
                    strength, confidence, and a strong sense of discipline. Farhan is deeply committed to shaping
                    well-rounded individuals through martial arts.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6 text-center">Our Philosophy</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-900 p-6 rounded-lg border-t-4 border-red-600">
                  <h3 className="text-xl font-bold mb-4">Discipline</h3>
                  <p className="text-gray-300">
                    We believe that discipline is the foundation of success in martial arts and in life. Our structured
                    training programs help students develop focus, self-control, and commitment.
                  </p>
                </div>

                <div className="bg-gray-900 p-6 rounded-lg border-t-4 border-red-600">
                  <h3 className="text-xl font-bold mb-4">Respect</h3>
                  <p className="text-gray-300">
                    Respect is at the core of our teaching philosophy. We foster an environment where students learn to
                    respect themselves, their peers, their instructors, and their community.
                  </p>
                </div>

                <div className="bg-gray-900 p-6 rounded-lg border-t-4 border-red-600">
                  <h3 className="text-xl font-bold mb-4">Excellence</h3>
                  <p className="text-gray-300">
                    We push our students to strive for excellence in everything they do. Through challenging training
                    and positive reinforcement, we help them reach their full potential.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-6">Join Our Community</h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                Ready to begin your martial arts journey? Join the XMF-EXTREME community today and discover the
                transformative power of martial arts training.
              </p>
              <Link href="/signup">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">Get Started Today</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
