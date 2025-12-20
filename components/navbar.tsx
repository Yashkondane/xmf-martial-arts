"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, User } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { motion } from "framer-motion"

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

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${
        scrolled ? "bg-background/95 shadow-md" : "bg-background/80"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            className="relative h-10 w-10 overflow-hidden rounded-full"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image src="/images/xmf-logo-white-bg.jpeg" alt="XMF Logo" fill className="object-cover" />
          </motion.div>
          <motion.span className="text-xl font-bold" whileHover={{ color: "#dc2626" }}>
            XMF-EXTREME
          </motion.span>
        </Link>

        {/* Mobile menu button */}
        <motion.button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          <Menu className="h-6 w-6" />
        </motion.button>

        {/* Desktop navigation */}
        <motion.nav className="hidden md:flex items-center gap-6 text-sm font-medium" variants={navVariants}>
          {[
            { href: "/", label: "Home" },
            { href: "/about", label: "About XMF" },
            { href: "/#programs", label: "Programs" },
            { href: "/gallery", label: "Gallery" },
            { href: "/locations", label: "Our Locations" },
            { href: "/faqs", label: "FAQs" },
            { href: "/#contact", label: "Contact Us" },
          ].map((link) => (
            <motion.div key={link.href} variants={itemVariants}>
              <Link href={link.href} className="nav-link relative">
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-red-600"
                    layoutId="navbar-underline"
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* Sign in/up buttons or user profile */}
        {!loading && (
          <motion.div className="hidden md:flex items-center gap-4" variants={navVariants}>
            {user ? (
              <Link href="/dashboard">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="flex items-center gap-2 button-hover">
                    <User className="h-4 w-4" />
                    Dashboard
                  </Button>
                </motion.div>
              </Link>
            ) : (
              <>
                <Link href="/signin">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" className="button-hover">
                      Login
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/signup">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-red-600 hover:bg-red-700 text-white button-hover">Sign Up</Button>
                  </motion.div>
                </Link>
              </>
            )}
          </motion.div>
        )}

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            className="absolute top-16 left-0 right-0 bg-background border-b md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col p-4">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About XMF" },
                { href: "/#programs", label: "Programs" },
                { href: "/gallery", label: "Gallery" },
                { href: "/locations", label: "Our Locations" },
                { href: "/faqs", label: "FAQs" },
                { href: "/#contact", label: "Contact Us" },
              ].map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="py-2 block hover:text-red-600 transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="flex flex-col gap-2 mt-4">
                {user ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white button-hover">Dashboard</Button>
                    </Link>
                  </motion.div>
                ) : (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <Link href="/signin" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full button-hover">
                          Sign In
                        </Button>
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                        <Button className="w-full bg-red-600 hover:bg-red-700 text-white button-hover">Sign Up</Button>
                      </Link>
                    </motion.div>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
