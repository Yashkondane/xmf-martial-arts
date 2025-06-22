"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase" // Correct import for client-side Supabase
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon, UsersIcon, CalendarIcon, SettingsIcon, LogOutIcon, HomeIcon } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  // Use the already initialized supabase client from lib/supabase.ts
  // const supabase = createClient(); // No longer needed here

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (error) {
        console.error("AdminLayout: Error getting session:", error)
        setLoading(false)
        router.push("/signin")
        return
      }

      if (session) {
        setUserEmail(session.user.email)
        console.log("AdminLayout: User session found. Email:", session.user.email)
        // This is the client-side check for direct access
        if (session.user.email !== "kashyash48@gmail.com") {
          console.log("AdminLayout: User is not kashyash48@gmail.com, redirecting to dashboard.")
          router.push("/dashboard")
        } else {
          console.log("AdminLayout: User is kashyash48@gmail.com, granting access.")
        }
      } else {
        console.log("AdminLayout: No user session found, redirecting to signin.")
        router.push("/signin")
      }
      setLoading(false)
    }

    checkUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUserEmail(session.user?.email || null)
        if (session.user?.email !== "kashyash48@gmail.com") {
          router.push("/dashboard")
        }
      } else {
        setUserEmail(null)
        router.push("/signin")
      }
    })

    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe()
      }
    }
  }, [router, supabase, pathname])

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Error signing out:", error)
    } else {
      router.push("/signin")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading admin panel...</p>
      </div>
    )
  }

  // Only render children if the specific admin email is logged in
  if (userEmail === "kashyash48@gmail.com") {
    return (
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-[60px] items-center border-b px-6">
              <Link className="flex items-center gap-2 font-semibold" href="/admin">
                <SettingsIcon className="h-6 w-6" />
                <span>Admin Dashboard</span>
              </Link>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-4 text-sm font-medium">
                <Link
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                    pathname === "/admin" ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-50" : ""
                  }`}
                  href="/admin"
                >
                  <HomeIcon className="h-4 w-4" />
                  Overview
                </Link>
                <Link
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                    pathname === "/admin/profiles" ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-50" : ""
                  }`}
                  href="/admin/profiles"
                >
                  <UsersIcon className="h-4 w-4" />
                  Profiles
                </Link>
                <Link
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                    pathname === "/admin/events" ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-50" : ""
                  }`}
                  href="/admin/events"
                >
                  <CalendarIcon className="h-4 w-4" />
                  Events
                </Link>
              </nav>
            </div>
            <div className="mt-auto p-4">
              <Button className="w-full" variant="outline" onClick={handleSignOut}>
                <LogOutIcon className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="lg:hidden" size="icon" variant="outline">
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <Link className="flex items-center gap-2 font-semibold" href="/admin">
                  <SettingsIcon className="h-6 w-6" />
                  <span>Admin Dashboard</span>
                </Link>
                <nav className="grid gap-2 text-lg font-medium mt-4">
                  <Link
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                      pathname === "/admin" ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-50" : ""
                    }`}
                    href="/admin"
                  >
                    <HomeIcon className="h-5 w-5" />
                    Overview
                  </Link>
                  <Link
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                      pathname === "/admin/profiles"
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-50"
                        : ""
                    }`}
                    href="/admin/profiles"
                  >
                    <UsersIcon className="h-5 w-5" />
                    Profiles
                  </Link>
                  <Link
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                      pathname === "/admin/events" ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-50" : ""
                    }`}
                    href="/admin/events"
                  >
                    <CalendarIcon className="h-5 w-5" />
                    Events
                  </Link>
                  <Button className="w-full mt-4" variant="outline" onClick={handleSignOut}>
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
              <h1 className="font-semibold text-lg">{pathname.split("/").pop()?.replace(/-/g, " ") || "Admin"}</h1>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">{children}</main>
        </div>
      </div>
    )
  }

  // If not the specific admin email, show nothing or a redirect message
  return null
}
