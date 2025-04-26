"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Mail } from "lucide-react"

export default function ResetPassword() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess(false)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      })

      if (error) throw error

      setSuccess(true)
    } catch (err: any) {
      setError(err.message || "Failed to send password reset email. Please try again.")
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

      {/* Right side - Reset password form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Reset Password</h2>
              <p className="text-gray-600 mt-2">Enter your email to receive a password reset link.</p>
            </div>
            <Link href="/signin" className="text-sm text-gray-500 hover:text-gray-700">
              Back to Sign In
            </Link>
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
              <Mail className="h-4 w-4" />
              <AlertTitle>Email Sent</AlertTitle>
              <AlertDescription>
                If an account exists with this email, you will receive a password reset link. Please check your inbox.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>

            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-3" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p>
              Remember your password?{" "}
              <Link href="/signin" className="text-red-600 hover:text-red-800 font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
