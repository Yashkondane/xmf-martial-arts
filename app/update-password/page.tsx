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
import { AlertCircle, Check, Lock } from "lucide-react"

export default function UpdatePassword() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [sessionChecked, setSessionChecked] = useState(false)
  const [hasSession, setHasSession] = useState(false)

  useEffect(() => {
    // Check if we have a session (user is authenticated via reset link)
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession()

        if (data.session) {
          setHasSession(true)
          console.log("User has an active session for password reset")
        } else {
          console.log("No active session found for password reset")
        }

        setSessionChecked(true)
      } catch (err) {
        console.error("Error checking session:", err)
        setError("Failed to verify your session. Please try the reset link again.")
        setSessionChecked(true)
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

    // Validate password strength
    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
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
      console.error("Password update error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading state while checking session
  if (!sessionChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4">Verifying your session...</p>
        </div>
      </div>
    )
  }

  // If no session, show error
  if (sessionChecked && !hasSession && !success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <div className="text-center mb-6">
            <div className="bg-red-100 rounded-full p-3 inline-flex">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold mt-4">Invalid or Expired Link</h2>
            <p className="text-gray-600 mt-2">
              This password reset link is invalid or has expired. Please request a new password reset link.
            </p>
          </div>
          <Button
            className="w-full bg-red-600 hover:bg-red-700 text-white btn-animate"
            onClick={() => router.push("/reset-password")}
          >
            Request New Reset Link
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Logo and branding */}
      <div className="hidden md:flex md:w-1/2 bg-black flex-col items-center justify-center p-8">
        <div className="relative w-32 h-32 mb-6">
          <Image src="/images/xmf-logo-black-bg.jpeg" alt="XMF Logo" fill className="object-contain rounded-full" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2 text-animate">XMF-EXTREME</h1>
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
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-3 pl-10 border rounded-md"
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500">Password must be at least 6 characters long</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full p-3 pl-10 border rounded-md"
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 btn-animate"
                disabled={isLoading}
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
