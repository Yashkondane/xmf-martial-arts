import Image from "next/image"

export default function AboutPage() {
  return (
    <main className="flex-1 bg-black text-white">
      <section id="our-story" className="py-16 section-transition">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-transition">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 fade-in">
              <p className="text-gray-200 text-lg">
                Welcome to XMF-EXTREME, where discipline meets determination and every kick is a step toward excellence.
                Founded on the principles of respect, perseverance, and self- improvement, our martial arts academy has
                been training champions and building character for over a decade.
              </p>
              <p className="text-gray-200 text-lg">
                Our journey began with a simple mission: to provide world-class martial arts training that not only
                develops physical skills but also nurtures mental strength and personal growth. Today, we're proud to
                have helped thousands of students achieve their goals and discover their potential.
              </p>
              <p className="text-gray-200 text-lg">
                With locations in Taverekere, Free Kick, The Iwan, and Avalahalli, we offer comprehensive programs for
                all ages and skill levels. Whether you're looking to compete at the highest levels or simply want to
                improve your fitness and confidence, XMF-EXTREME has a program for you.
              </p>
            </div>
            <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-lg bg-black fade-in-delay-1">
              <Image
                src="/images/about-our-story.jpg"
                alt="Our Story - Group Photo"
                fill
                className="object-contain object-center"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="our-founder" className="py-16 bg-black section-transition">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-transition">Our Founder – Farhan Khan XMF</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-lg bg-black fade-in">
              <Image
                src="/images/about-founder.jpg"
                alt="Our Founder - Farhan Khan XMF"
                fill
                className="object-contain object-center"
              />
            </div>
            <div className="space-y-4 fade-in-delay-1">
              <p className="text-gray-200 text-lg">
                Farhan Khan XMF is a seasoned martial arts coach with over 9 years of experience. A national instructor,
                he has trained students to achieve success at state and national levels. His approach blends discipline,
                fitness, and mental strength to build complete athletes. He holds a Black Belt in ITF Taekwondo and a
                3rd Dan Black Belt in Karate (WFSKO).
              </p>
              <p className="text-gray-200 text-lg">
                Farhan is an active MMA fighter and a member of the Taekwondo Association of Karnataka. He also claimed
                the Bengaluru Bodybuilding 2024 Men's Physique Title, proving his dedication to fitness. With a diverse
                martial arts background, he provides students with practical, real-world combat skills. He fosters a
                focused and positive training space where students of all levels thrive.
              </p>
              <p className="text-gray-200 text-lg">
                Known as one of Karnataka's top trainers, Farhan emphasizes respect, integrity, and perseverance. He
                inspires students to push limits and grow both technically and mentally. His coaching style builds
                strength, confidence, and a strong sense of discipline. Farhan is deeply committed to shaping
                well-rounded individuals through martial arts.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
