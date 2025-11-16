"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Award, MapPin, Phone, Mail, Users, Heart, Weight, Home, Calendar, LogOut, Trophy, TrendingUp } from 'lucide-react'

interface StudentData {
  id: string
  email: string
  student_name: string
  date_of_birth: string
  gender: string
  contact_number: string
  club_location: string
  blood_group: string
  weight: string
  address: string
  current_belt: string
  guardian_name: string
  emergency_contact: string
}

const beltHierarchy = [
  { name: "WHITE", color: "bg-white border-2 border-gray-300", order: 1 },
  { name: "YELLOW STRIPE", color: "bg-gradient-to-r from-white to-yellow-400", order: 2 },
  { name: "YELLOW BELT", color: "bg-yellow-400", order: 3 },
  { name: "GREEN BELT", color: "bg-green-500", order: 4 },
  { name: "BLUE BELT", color: "bg-blue-500", order: 5 },
  { name: "RED STRIPE", color: "bg-gradient-to-r from-white to-red-500", order: 6 },
  { name: "RED BELT", color: "bg-red-500", order: 7 },
  { name: "BLACK STRIPE", color: "bg-gradient-to-r from-red-600 to-black", order: 8 },
  { name: "BLACKL STRIPE", color: "bg-gradient-to-r from-red-600 to-black", order: 8 },
  { name: "BLACK BELT", color: "bg-black", order: 9 },
]

export default function StudentDashboard() {
  const router = useRouter()
  const [student, setStudent] = useState<StudentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const supabase = createClient()

  useEffect(() => {
    const loadStudentData = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
          router.push("/student-login")
          return
        }

        // Fetch student data from students table
        const { data: studentData, error: studentError } = await supabase
          .from("students")
          .select("*")
          .eq("id", user.id)
          .single()

        if (studentError) {
          console.error("Error fetching student:", studentError)
          setError("Could not load your data. Please contact administration.")
        } else {
          setStudent(studentData)
        }

        setLoading(false)
      } catch (err) {
        console.error("Dashboard error:", err)
        setError("An unexpected error occurred.")
        setLoading(false)
      }
    }

    loadStudentData()
  }, [router, supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/student-login")
  }

  const getBeltInfo = (currentBelt: string) => {
    const normalized = currentBelt.toUpperCase()
    const current = beltHierarchy.find(b => b.name === normalized)
    const currentOrder = current?.order || 1
    const nextBelt = beltHierarchy.find(b => b.order === currentOrder + 1)
    const progress = (currentOrder / beltHierarchy.length) * 100

    return { current, nextBelt, progress, currentOrder }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-900 via-black to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-white">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-900 via-black to-gray-900">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{error || "Student data not found."}</p>
            <Button onClick={() => router.push("/student-login")} className="w-full">
              Back to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const beltInfo = getBeltInfo(student.current_belt)

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-gray-900 py-8 px-4">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Welcome, {student.student_name}</h1>
            <p className="text-gray-300">XMF Student Dashboard</p>
          </div>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20" 
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {/* Personal Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-black/40 border-red-900/20 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Current Belt</CardTitle>
              <Award className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className={`h-6 w-16 rounded ${beltInfo.current?.color}`}></div>
                <span className="text-white font-medium">{student.current_belt}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-red-900/20 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Club Location</CardTitle>
              <MapPin className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-white">{student.club_location}</div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-red-900/20 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Blood Group</CardTitle>
              <Heart className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-white">{student.blood_group}</div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-red-900/20 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Weight</CardTitle>
              <Weight className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-white">{student.weight}</div>
            </CardContent>
          </Card>
        </div>

        {/* Belt Progress Section */}
        <Card className="mb-8 bg-black/40 border-red-900/20 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Trophy className="h-5 w-5 text-red-400" />
              Belt Progression
            </CardTitle>
            <CardDescription className="text-gray-400">Your journey through the belt system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Current Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">Current Progress</span>
                  <span className="text-red-400 font-bold">{Math.round(beltInfo.progress)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-red-600 to-red-400 h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                    style={{ width: `${beltInfo.progress}%` }}
                  >
                    <TrendingUp className="h-3 w-3 text-white" />
                  </div>
                </div>
                {beltInfo.nextBelt && (
                  <p className="text-sm text-gray-400 mt-2">
                    Next goal: {beltInfo.nextBelt.name}
                  </p>
                )}
              </div>

              {/* Belt Hierarchy Visual */}
              <div>
                <h3 className="text-white font-medium mb-3">Belt System</h3>
                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
                  {beltHierarchy.map((belt) => (
                    <div key={belt.name} className="text-center">
                      <div 
                        className={`h-8 rounded mx-auto mb-1 ${belt.color} ${
                          belt.order <= beltInfo.currentOrder 
                            ? 'ring-2 ring-red-400 ring-offset-2 ring-offset-gray-900' 
                            : 'opacity-40'
                        }`}
                      ></div>
                      <p className="text-xs text-gray-400">{belt.name.split(' ')[0]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Student Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card className="bg-black/40 border-red-900/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="h-5 w-5 text-red-400" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 pb-3 border-b border-gray-700">
                <Calendar className="h-5 w-5 text-red-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400">Date of Birth</p>
                  <p className="text-white font-medium">{student.date_of_birth}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 pb-3 border-b border-gray-700">
                <User className="h-5 w-5 text-red-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400">Gender</p>
                  <p className="text-white font-medium">{student.gender}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 pb-3 border-b border-gray-700">
                <Phone className="h-5 w-5 text-red-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400">Contact Number</p>
                  <p className="text-white font-medium">{student.contact_number}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 pb-3 border-b border-gray-700">
                <Mail className="h-5 w-5 text-red-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="text-white font-medium break-all">{student.email}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Home className="h-5 w-5 text-red-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400">Address</p>
                  <p className="text-white font-medium">{student.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Guardian/Emergency Information */}
          <Card className="bg-black/40 border-red-900/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-5 w-5 text-red-400" />
                Guardian & Emergency Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 pb-3 border-b border-gray-700">
                <User className="h-5 w-5 text-red-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400">Guardian Name</p>
                  <p className="text-white font-medium">{student.guardian_name}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-red-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400">Emergency Contact</p>
                  <p className="text-white font-medium">{student.emergency_contact}</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-red-900/20 rounded-lg border border-red-900/30">
                <p className="text-xs text-gray-300 mb-2">Important Information</p>
                <p className="text-sm text-white">
                  In case of emergency, your guardian will be contacted immediately at the number provided above.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
