import Image from "next/image"

export function AboutSection() {
  return (
    <section id="about" className="py-16 bg-black text-white section-transition">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12 text-transition">About XMF</h2>

        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 relative h-64 md:h-80 w-full overflow-hidden rounded-lg fade-in">
            <Image src="/placeholder.svg?height=400&width=600" alt="About XMF" fill className="object-cover" />
          </div>

          <div className="flex-1 fade-in-delay-1">
            <p className="text-gray-200 text-lg">
              Welcome to XMF, where discipline meets determination and every kick is a step toward excellence. Founded
              on the principles of respect, perseverance, and self-improvement.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
