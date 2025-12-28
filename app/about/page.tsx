import Image from "next/image"

function Section({
  id,
  title,
  children,
  reverse = false,
}: {
  id: string
  title: string
  children: React.ReactNode
  reverse?: boolean
}) {
  return (
    <section id={id} className="py-16 bg-black section-transition">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-transition">
          {title}
        </h2>

        <div
          className={`grid md:grid-cols-2 gap-8 items-center ${
            reverse ? "md:flex-row-reverse" : ""
          }`}
        >
          {children}
        </div>
      </div>
    </section>
  )
}

function TextBlock({
  children,
  delay = false,
}: {
  children: React.ReactNode
  delay?: boolean
}) {
  return (
    <div className={`space-y-4 ${delay ? "fade-in-delay-1" : "fade-in"}`}>
      {children}
    </div>
  )
}

function ImageBlock({
  src,
  alt,
  delay = false,
}: {
  src: string
  alt: string
  delay?: boolean
}) {
  return (
    <div
      className={`relative h-64 md:h-96 w-full overflow-hidden rounded-lg bg-black ${
        delay ? "fade-in-delay-1" : "fade-in"
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain object-center"
        priority
      />
    </div>
  )
}

export default function AboutPage() {
  return (
    <main className="flex-1 bg-black text-white">
      {/* OUR STORY */}
      <Section id="our-story" title="Our Story">
        <TextBlock>
          <p className="text-gray-200 text-lg">
            Welcome to XMF-EXTREME, where discipline meets determination and
            every kick is a step toward excellence. Founded on respect,
            perseverance, and self-improvement, our academy has been building
            champions and character for over a decade.
          </p>

          <p className="text-gray-200 text-lg">
            Our mission began with providing world-class martial arts training
            that strengthens both body and mind. Today, we proudly support
            thousands of students in achieving their goals and unlocking their
            full potential.
          </p>

          <p className="text-gray-200 text-lg">
            With locations in Taverekere, Free Kick, The Iwan, and Avalahalli,
            we offer programs for all ages and skill levels — from fitness and
            confidence building to elite-level competition training.
          </p>
        </TextBlock>

        <ImageBlock
          src="/images/about-our-story.jpg"
          alt="XMF Extreme academy group training"
          delay
        />
      </Section>

      {/* FOUNDER */}
      <Section
        id="our-founder"
        title="Our Founder – Farhan Khan XMF"
      >
        <ImageBlock
          src="/images/about-founder.jpg"
          alt="Founder Farhan Khan XMF"
        />

        <TextBlock delay>
          <p className="text-gray-200 text-lg">
            Farhan Khan XMF is a seasoned martial arts coach with over 9 years
            of experience. A national instructor, he has guided athletes to
            state and national success. He holds a Black Belt in ITF Taekwondo
            and a 3rd Dan Black Belt in Karate (WFSKO).
          </p>

          <p className="text-gray-200 text-lg">
            An active MMA fighter and member of the Taekwondo Association of
            Karnataka, Farhan also earned the Bengaluru Bodybuilding 2024
            Men’s Physique title — showcasing his dedication to peak fitness.
          </p>

          <p className="text-gray-200 text-lg">
            Known as one of Karnataka’s top trainers, Farhan emphasizes
            discipline, respect, and perseverance. His coaching builds
            confident, strong, and mentally resilient individuals through
            martial arts.
          </p>
        </TextBlock>
      </Section>
    </main>
  )
}
