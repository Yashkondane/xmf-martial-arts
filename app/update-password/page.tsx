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

  useEffect(() => {
    // Check if we have a session (user is authenticated via reset link)
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        // No session, redirect to reset password page
        router.push("/reset-password")
      }
    }

    checkSession()
  }, [router])

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
          <Image src="/placeholder.svg?height=200&width=200" alt="XMF Logo" fill className="object-contain" />
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

          {!success && (
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

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-3" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
