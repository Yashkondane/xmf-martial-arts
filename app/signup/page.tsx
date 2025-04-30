"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { signUp } from "@/lib/supabase"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Mail } from "lucide-react"

export default function SignUp() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [program, setProgram] = useState("taekwondo")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [confirmationSent, setConfirmationSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setConfirmationSent(false)

    try {
      const { user, error: signUpError } = await signUp(email, password, {
        name,
        program,
      })

      if (signUpError) {
        throw signUpError
      }

      if (user) {
        // Show success message with email confirmation info
        setConfirmationSent(true)
        setShowSuccess(true)

        // Don't auto-redirect since we need email confirmation
      } else {
        throw new Error("Failed to create user account")
      }
    } catch (err: any) {
      let errorMessage = "Failed to sign up. Please try again."

      // Handle specific Supabase error messages
      if (err.message) {
        if (err.message.includes("Email already registered")) {
          errorMessage = "This email is already registered. Please sign in instead."
        } else if (err.message.includes("Password should be at least")) {
          errorMessage = "Password should be at least 6 characters long."
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

      {/* Right side - Sign up form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Sign Up</h2>
              <p className="text-gray-600 mt-2">Create your account to join XMF-EXTREME</p>
            </div>
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
              Back to Home
            </Link>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {confirmationSent && (
            <Alert className="mb-6 border-green-500 text-green-800 bg-green-50">
              <Mail className="h-4 w-4" />
              <AlertTitle>Email Confirmation Required</AlertTitle>
              <AlertDescription>
                <p>
                  We've sent a confirmation email to <strong>{email}</strong>.
                </p>
                <p className="mt-2">
                  Please check your inbox and follow the instructions to confirm your email address before signing in.
                </p>
              </AlertDescription>
            </Alert>
          )}

          {!confirmationSent && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-3 border rounded-md"
                />
              </div>

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
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3 border rounded-md"
                />
              </div>

              <div className="space-y-2">
                <Label>Select Program</Label>
                <RadioGroup value={program} onValueChange={setProgram} className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="taekwondo" id="taekwondo" />
                    <Label htmlFor="taekwondo">Taekwondo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bostaff" id="bostaff" />
                    <Label htmlFor="bostaff">Bo Staff</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="calisthenics" id="calisthenics" />
                    <Label htmlFor="calisthenics">Calisthenics</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white py-3" disabled={isLoading}>
                {isLoading ? "Signing Up..." : "Sign Up"}
              </Button>
            </form>
          )}

          {confirmationSent && (
            <div className="mt-6">
              <Button
                className="w-full bg-black hover:bg-gray-800 text-white py-3"
                onClick={() => router.push("/signin")}
              >
                Go to Sign In
              </Button>
            </div>
          )}

          <div className="text-center mt-6">
            <p>
              Already have an account?{" "}
              <Link href="/signin" className="text-red-600 hover:text-red-800 font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Success popup */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 transform",
          showSuccess ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
        )}
      >
        <div className="bg-white border-t border-gray-200 shadow-lg p-4 md:p-6 rounded-t-lg mx-auto max-w-7xl">
          <div className="flex items-start justify-between">
            <p className="text-black text-sm md:text-base pr-8">
              You've successfully signed up with <span className="text-red-600 font-medium">XMF</span>. Please check
              your email to confirm your account.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="flex-shrink-0 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
              aria-label="Close popup"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
