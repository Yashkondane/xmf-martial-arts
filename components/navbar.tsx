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

    return () => {
      authListener.subscription.unsubscribe()
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="XMF Logo"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <span className="text-xl font-bold">XMF-EXTREME</span>
        </Link>

        {/* Mobile menu button */}
        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          <Menu className="h-6 w-6" />
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-foreground/80">
            Home
          </Link>
          <Link href="/about" className="transition-colors hover:text-foreground/80">
            About XMF
          </Link>
          <Link href="/#programs" className="transition-colors hover:text-foreground/80">
            Programs
          </Link>
          <Link href="/gallery" className="transition-colors hover:text-foreground/80">
            Gallery
          </Link>
          <Link href="/locations" className="transition-colors hover:text-foreground/80">
            Our Locations
          </Link>
          <Link href="/faqs" className="transition-colors hover:text-foreground/80">
            FAQs
          </Link>
          <Link href="/#contact" className="transition-colors hover:text-foreground/80">
            Contact Us
          </Link>
        </nav>

        {/* Sign in/up buttons or user profile */}
        {!loading && (
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <Link href="/dashboard">
                <Button variant="outline" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/signin">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        )}

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b md:hidden">
            <nav className="flex flex-col p-4">
              <Link href="/" className="py-2 hover:text-foreground/80" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link href="/about" className="py-2 hover:text-foreground/80" onClick={() => setIsMenuOpen(false)}>
                About XMF
              </Link>
              <Link href="/#programs" className="py-2 hover:text-foreground/80" onClick={() => setIsMenuOpen(false)}>
                Programs
              </Link>
              <Link href="/gallery" className="py-2 hover:text-foreground/80" onClick={() => setIsMenuOpen(false)}>
                Gallery
              </Link>
              <Link href="/locations" className="py-2 hover:text-foreground/80" onClick={() => setIsMenuOpen(false)}>
                Our Locations
              </Link>
              <Link href="/faqs" className="py-2 hover:text-foreground/80" onClick={() => setIsMenuOpen(false)}>
                FAQs
              </Link>
              <Link href="/#contact" className="py-2 hover:text-foreground/80" onClick={() => setIsMenuOpen(false)}>
                Contact Us
              </Link>
              <div className="flex flex-col gap-2 mt-4">
                {user ? (
                  <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Dashboard</Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/signin" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Sign Up</Button>
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
