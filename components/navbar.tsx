"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, User } from "lucide-react"
import { supabase } from "@/lib/supabase"

export function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession()
      setUser(data.session?.user || null)
      setLoading(false)
    }

    checkUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      authListener.subscription.unsubscribe()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Don't show navbar on sign in and sign up pages
  if (
    pathname === "/signin" ||
    pathname === "/signup" ||
    pathname === "/reset-password" ||
    pathname === "/update-password"
  ) {
    return null
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${
        scrolled ? "bg-background/95 shadow-md" : "bg-background/80"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-10 w-10 overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-110">
            <Image src="/images/xmf-logo-white-bg.jpeg" alt="XMF Logo" fill className="object-cover" />
          </div>
          <span className="text-xl font-bold text-animate">XMF-EXTREME</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 transition-transform duration-300 hover:scale-110"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium stagger-fade-in">
          <Link href="/" className="link-underline">
            Home
          </Link>
          <Link href="/about" className="link-underline">
            About XMF
          </Link>
          <Link href="/#programs" className="link-underline">
            Programs
          </Link>
          <Link href="/gallery" className="link-underline">
            Gallery
          </Link>
          <Link href="/locations" className="link-underline">
            Our Locations
          </Link>
          <Link href="/faqs" className="link-underline">
            FAQs
          </Link>
          <Link href="/#contact" className="link-underline">
            Contact Us
          </Link>
        </nav>

        {/* Sign in/up buttons or user profile */}
        {!loading && (
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <Link href="/dashboard">
                <Button variant="outline" className="flex items-center gap-2 btn-animate">
                  <User className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/signin">
                  <Button variant="outline" className="btn-animate">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-red-600 hover:bg-red-700 text-white btn-animate">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        )}

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b md:hidden slide-in-left">
            <nav className="flex flex-col p-4 stagger-fade-in">
              <Link
                href="/"
                className="py-2 hover:text-red-600 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="py-2 hover:text-red-600 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                About XMF
              </Link>
              <Link
                href="/#programs"
                className="py-2 hover:text-red-600 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Programs
              </Link>
              <Link
                href="/gallery"
                className="py-2 hover:text-red-600 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link
                href="/locations"
                className="py-2 hover:text-red-600 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Locations
              </Link>
              <Link
                href="/faqs"
                className="py-2 hover:text-red-600 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQs
              </Link>
              <Link
                href="/#contact"
                className="py-2 hover:text-red-600 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
              <div className="flex flex-col gap-2 mt-4">
                {user ? (
                  <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white btn-animate">Dashboard</Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/signin" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full btn-animate">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white btn-animate">Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
