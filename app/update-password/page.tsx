"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Check } from "lucide-react"

export default function UpdatePassword() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [canUpdate, setCanUpdate] = useState(false)

  useEffect(() => {
    // Try to establish a session from the recovery link (tokens in URL hash)
    const tryInitRecovery = async () => {
      const hash = typeof window !== "undefined" ? window.location.hash : ""
      const params = new URLSearchParams(hash.replace("#", ""))

      const type = params.get("type")
      const access_token = params.get("access_token")
      const refresh_token = params.get("refresh_token")

      // If this is a recovery link, set the session so updateUser() can succeed
      if (type === "recovery" && access_token && refresh_token) {
        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        })
        if (!error) {
          setCanUpdate(true)
          // Clean the URL so tokens aren’t visible
          window.history.replaceState({}, document.title, window.location.pathname)
          return
        }
      }

      // Fallback: if a session already exists, we’re good
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        setCanUpdate(true)
      }
    }

    void tryInitRecovery()

    // Also listen for PASSWORD_RECOVERY in case Supabase sets the session asynchronously
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setCanUpdate(true)
      }
    })

    return () => {
      sub.subscription.unsubscribe()
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({ password })

      if (error) throw error

      setSuccess(true)

      // Redirect to sign in after 3 seconds
      setTimeout(() => {
        router.push("/signin")
      }, 3000)
    } catch (err: any) {
      setError(err.message || "Failed to update password. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Logo and branding */}
      <div className="hidden md:flex md:w-1/2 bg-black flex-col items-center justify-center p-8">
        <div className="relative w-32 h-32 mb-6">
          <Image src="/images/xmf-logo-black-bg.jpeg" alt="XMF Logo" fill className="object-contain rounded-full" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">XMF-EXTREME</h1>
        <p className="text-red-600 text-xl">MARTIAL ARTS & FITNESS</p>
      </div>

      {/* Right side - Update password form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Update Password</h2>
            <p className="text-gray-600 mt-2">Enter your new password below.</p>
          </div>

          {!canUpdate && (
            <div className="mb-4 text-sm text-gray-600">
              {
                "Open the password reset link from your email to continue. If this page was opened directly, request a new reset email."
              }
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 border-green-500 text-green-800 bg-green-50">
              <Check className="h-4 w-4" />
              <AlertTitle>Password Updated</AlertTitle>
              <AlertDescription>
                Your password has been successfully updated. You will be redirected to the sign in page shortly.
              </AlertDescription>
            </Alert>
          )}

          {!success && canUpdate && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3 border rounded-md"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full p-3 border rounded-md"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3"
                disabled={isLoading || !canUpdate}
              >
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
