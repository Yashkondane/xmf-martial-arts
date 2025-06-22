"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase, signIn } from "@/lib/supabase"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Mail } from "lucide-react"

export default function SignIn() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isEmailUnconfirmed, setIsEmailUnconfirmed] = useState(false)
  const [isResendingEmail, setIsResendingEmail] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setIsEmailUnconfirmed(false)
    setResendSuccess(false)

    try {
      const { user, error: signInError } = await signIn(email, password)

      if (signInError) {
        // Check if the error is due to unconfirmed email
        if (signInError.message?.includes("Email not confirmed")) {
          setIsEmailUnconfirmed(true)
        } else {
          throw signInError
        }
      } else if (user) {
        // Check if the signed-in user is the admin
        if (user.email === "kashyash48@gmail.com") {
          router.push("/admin") // Redirect to admin dashboard
        } else {
          router.push("/dashboard") // Redirect to regular dashboard
        }
      }
    } catch (err: any) {
      let errorMessage = "Failed to sign in. Please check your credentials."

      // Handle specific error messages
      if (err.message) {
        if (err.message.includes("Invalid login credentials")) {
          errorMessage = "Invalid email or password. Please try again."
        } else {
          errorMessage = err.message
        }
      }

      setError(errorMessage)
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendConfirmation = async () => {
    setIsResendingEmail(true)
    setResendSuccess(false)
    setError("")

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
      })

      if (error) throw error

      setResendSuccess(true)
    } catch (err: any) {
      setError(`Failed to resend confirmation email: ${err.message}`)
      console.error(err)
    } finally {
      setIsResendingEmail(false)
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

      {/* Right side - Sign in form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Sign In</h2>
              <p className="text-gray-600 mt-2">Welcome back! Please sign in to your account.</p>
            </div>
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
              Back to Home
            </Link>
          </div>

          {error && !isEmailUnconfirmed && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isEmailUnconfirmed && (
            <Alert className="mb-6 border-amber-500 text-amber-800 bg-amber-50">
              <Mail className="h-4 w-4" />
              <AlertTitle>Email Not Confirmed</AlertTitle>
              <AlertDescription>
                <p className="mb-2">Please check your inbox and confirm your email address before signing in.</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResendConfirmation}
                  disabled={isResendingEmail || resendSuccess}
                  className="mt-2"
                >
                  {isResendingEmail ? "Sending..." : resendSuccess ? "Email Sent!" : "Resend Confirmation Email"}
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {resendSuccess && (
            <Alert className="mb-6 border-green-500 text-green-800 bg-green-50">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Confirmation Email Sent</AlertTitle>
              <AlertDescription>
                Please check your inbox and follow the instructions to confirm your email address.
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

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>

            <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white py-3" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="text-center mt-6 space-y-2">
            <p>
              Don't have an account?{" "}
              <Link href="/signup" className="text-red-600 hover:text-red-800 font-medium">
                Sign Up
              </Link>
            </p>
            <p>
              <Link href="/reset-password" className="text-gray-600 hover:text-gray-800">
                Forgot your password?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
