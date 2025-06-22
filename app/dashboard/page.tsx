"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { supabase, getUserProfile, signOut } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, User, Award, Clock, LogOut } from "lucide-react"

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await supabase.auth.getSession()

        if (!data.session) {
          router.push("/signin")
          return
        }

        setUser(data.session.user)

        const { profile: userProfile, error: profileError } = await getUserProfile(data.session.user.id)

        if (profileError) {
          console.error("Error fetching profile:", profileError)
          setError("Could not load your profile. Please try again later.")
        }

        setProfile(
          userProfile || {
            name: data.session.user.user_metadata?.name || "Student",
            email: data.session.user.email,
            program: data.session.user.user_metadata?.program || "taekwondo",
          },
        )

        setLoading(false)
      } catch (err) {
        console.error("Dashboard error:", err)
        setError("An unexpected error occurred. Please try again later.")
        setLoading(false)
      }
    }

    checkUser()
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
          <p className="mt-4">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Removed the duplicate Navbar component from here */}

      <main className="flex-1 bg-gray-50">
        <div className="container py-8">
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Welcome, {profile?.name || "Student"}</h1>
              <p className="text-gray-600">Manage your XMF-EXTREME account and training</p>
            </div>
            <Button variant="outline" className="flex items-center gap-2 mt-4 md:mt-0" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="schedule">My Schedule</TabsTrigger>
              <TabsTrigger value="progress">My Progress</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Current Program</CardTitle>
                    <Award className="h-4 w-4 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold capitalize">{profile?.program || "Not enrolled"}</div>
                    <p className="text-xs text-muted-foreground">
                      {profile?.program === "taekwondo" && "Korean martial art focused on kicking techniques"}
                      {profile?.program === "bostaff" && "Ancient weapon training for coordination and strength"}
                      {profile?.program === "calisthenics" && "Bodyweight exercises for functional strength"}
                      {profile?.belt && ` • Current Belt: ${profile.belt}`}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Next Class</CardTitle>
                    <CalendarDays className="h-4 w-4 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Wednesday</div>
                    <p className="text-xs text-muted-foreground">6:00 PM - 7:30 PM</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Training Hours</CardTitle>
                    <Clock className="h-4 w-4 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12 hours</div>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>Stay updated with upcoming classes and events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>
                          <h3 className="font-medium">Belt Promotion Test</h3>
                          <p className="text-sm text-gray-500">Saturday, May 15 • 10:00 AM</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </div>
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>
                          <h3 className="font-medium">Sparring Workshop</h3>
                          <p className="text-sm text-gray-500">Tuesday, May 18 • 6:30 PM</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Regional Tournament</h3>
                          <p className="text-sm text-gray-500">Saturday, June 5 • 9:00 AM</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="schedule">
              <Card>
                <CardHeader>
                  <CardTitle>My Class Schedule</CardTitle>
                  <CardDescription>View and manage your upcoming classes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-red-100 text-red-600 p-3 rounded-lg">
                          <CalendarDays className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-medium capitalize">{profile?.program || "Class"}</h3>
                          <p className="text-sm text-gray-500">Monday • 6:00 PM - 7:30 PM</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Cancel
                      </Button>
                    </div>
                    <div className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-red-100 text-red-600 p-3 rounded-lg">
                          <CalendarDays className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-medium capitalize">{profile?.program || "Class"}</h3>
                          <p className="text-sm text-gray-500">Wednesday • 6:00 PM - 7:30 PM</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Cancel
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-red-100 text-red-600 p-3 rounded-lg">
                          <CalendarDays className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-medium capitalize">{profile?.program || "Class"}</h3>
                          <p className="text-sm text-gray-500">Friday • 6:00 PM - 7:30 PM</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-red-600 hover:bg-red-700">Book Additional Class</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="progress">
              <Card>
                <CardHeader>
                  <CardTitle>My Progress</CardTitle>
                  <CardDescription>Track your martial arts journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div>
                      <h3 className="font-medium mb-2">Current Belt</h3>
                      <div className="flex items-center gap-4">
                        <div className="h-4 w-16 bg-white border border-gray-300 rounded"></div>
                        <span>White Belt</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Progress to Next Belt</h3>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-red-600 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">45% complete - Estimated promotion: July 2025</p>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Skills Assessment</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Technique</span>
                            <span className="text-sm font-medium">70%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-red-600 h-2 rounded-full" style={{ width: "70%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Strength</span>
                            <span className="text-sm font-medium">65%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-red-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Flexibility</span>
                            <span className="text-sm font-medium">55%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-red-600 h-2 rounded-full" style={{ width: "55%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Discipline</span>
                            <span className="text-sm font-medium">80%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-red-600 h-2 rounded-full" style={{ width: "80%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Manage your personal details and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                      <div className="relative h-24 w-24 rounded-full overflow-hidden bg-gray-200">
                        {profile?.avatar_url ? (
                          <Image
                            src={profile.avatar_url || "/placeholder.svg"}
                            alt="Profile"
                            fill
                            className="object-cover"
                          />
                        ) : profile ? (
                          <Image src="/images/xmf-logo-white-bg.jpeg" alt="XMF Logo" fill className="object-cover" />
                        ) : (
                          <User className="h-full w-full p-4 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">{profile?.name}</h3>
                        <p className="text-gray-500">{user?.email}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Member since {new Date(user?.created_at || Date.now()).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-2">Personal Information</h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" defaultValue={profile?.name} className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" defaultValue={user?.email} className="mt-1" disabled />
                          </div>
                          <div>
                            <Label htmlFor="phone_number">Phone Number</Label>
                            <Input id="phone_number" defaultValue={profile?.phone_number} className="mt-1" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Program Information</h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="program">Current Program</Label>
                            <Input id="program" defaultValue={profile?.program} className="mt-1 capitalize" disabled />
                          </div>
                          <div>
                            <Label htmlFor="belt">Current Belt</Label>
                            <Input id="belt" defaultValue={profile?.belt} className="mt-1 capitalize" disabled />
                          </div>
                          <div>
                            <Label htmlFor="membership">Membership Type</Label>
                            <Input id="membership" defaultValue="Standard" className="mt-1" disabled />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-red-600 hover:bg-red-700">Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Removed the duplicate Footer component from here */}
    </div>
  )
}
