import Image from "next/image"
import Link from "next/link"
import { Facebook, Youtube, Instagram, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="flex items-center gap-4 mb-6 md:mb-0 group">
            <div className="relative h-16 w-16 overflow-hidden rounded-full transition-all duration-300 group-hover:scale-110">
              <Image src="/images/xmf-logo-black-bg.jpeg" alt="XMF Logo" fill className="object-cover" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-animate">XMF-EXTREME</h3>
              <p className="text-red-600 text-sm transition-all duration-300 group-hover:translate-x-2">
                MARTIAL ARTS & FITNESS
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm stagger-fade-in">
            <Link href="/" className="link-underline">
              Home
            </Link>
            <Link href="/about" className="link-underline">
              About
            </Link>
            <Link href="/#programs" className="link-underline">
              Programs
            </Link>
            <Link href="/gallery" className="link-underline">
              Gallery
            </Link>
            <Link href="/locations" className="link-underline">
              Locations
            </Link>
            <Link href="/faqs" className="link-underline">
              FAQs
            </Link>
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <a
            href="https://www.facebook.com/share/1JJfjLsXmc/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black hover:bg-gray-900 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hover:bg-red-600"
            aria-label="Facebook"
          >
            <Facebook className="h-6 w-6" />
          </a>
          <a
            href="https://youtube.com/@farhanxmf01?si=4kWtvMGkYc8bZReK"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black hover:bg-gray-900 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hover:bg-red-600"
            aria-label="YouTube"
          >
            <Youtube className="h-6 w-6" />
          </a>
          <a
            href="https://www.instagram.com/xmf_martial_arts?igsh=MWszemN5czhmejZvOA=="
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black hover:bg-gray-900 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hover:bg-red-600"
            aria-label="Instagram"
          >
            <Instagram className="h-6 w-6" />
          </a>
          <a
            href="https://x.com/xmf_martialarts?t=sT8ERbB-b0Q6NY8olBTIQA&s=09"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black hover:bg-gray-900 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hover:bg-red-600"
            aria-label="Twitter"
          >
            <Twitter className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/farhan-khan-32a438254?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black hover:bg-gray-900 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hover:bg-red-600"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-6 w-6" />
          </a>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-400 transition-all duration-300 hover:text-white">
            © {new Date().getFullYear()} XMF-EXTREME MARTIAL ARTS AND FITNESS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
