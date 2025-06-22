"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase-server" // Use the server client for session check
import { Button } from "@/components/ui/button"
import { LogOut, Users, CalendarDays, LayoutDashboard } from "lucide-react"
import Link from "next/link"
import { signOut } from "@/lib/supabase" // Client-side sign out

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAdminStatus = async () => {
      const supabase = createClient()
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (error || !session) {
        console.log("AdminLayout: No session or session error, redirecting to signin.", error)
        router.push("/signin")
        return
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single()

      console.log("AdminLayout: Fetched profile role:", profile?.role)
      console.log("AdminLayout: Profile fetch error:", profileError)

      if (profileError || profile?.role !== "admin") {
        console.log("AdminLayout: User is not admin or profile error, redirecting to dashboard.")
        router.push("/dashboard") // Redirect non-admins
        return
      }

      setIsAdmin(true)
      setLoading(false)
    }

    checkAdminStatus()
  }, [router])

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return null // Or a more explicit "Access Denied" message if not redirected
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-6 flex flex-col">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-red-600">Admin Panel</h2>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link
                href="/admin"
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                <LayoutDashboard className="h-5 w-5" /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/profiles"
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                <Users className="h-5 w-5" /> Profiles
              </Link>
            </li>
            <li>
              <Link
                href="/admin/events"
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                <CalendarDays className="h-5 w-5" /> Events
              </Link>
            </li>
          </ul>
        </nav>
        <Button
          variant="outline"
          className="flex items-center gap-2 mt-auto text-white border-red-600 hover:bg-red-600 hover:text-white"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
