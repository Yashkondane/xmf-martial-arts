"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { getAllProfiles } from "@/lib/supabase-admin"
import { UsersIcon } from "lucide-react"

const AdminPage = () => {
  const [totalUsers, setTotalUsers] = useState(0)
  const [adminUsers, setAdminUsers] = useState(0)
  const [regularUsers, setRegularUsers] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true)
      setError(null)
      try {
        const { profiles, error: fetchError } = await getAllProfiles()

        if (fetchError) {
          setError(fetchError.message || "Failed to fetch profiles.")
          console.error("Error fetching profiles for dashboard:", fetchError)
          return
        }

        if (profiles) {
          setTotalUsers(profiles.length)
          setAdminUsers(profiles.filter((p) => p.role === "admin").length)
          setRegularUsers(profiles.filter((p) => p.role === "user").length)
        }
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.")
        console.error("Unexpected error in fetchDashboardData:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
        <p>Loading dashboard data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)] text-red-500">
        <p>Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <UsersIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalUsers}</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Total registered users</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
          <UsersIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{adminUsers}</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Users with admin privileges</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Regular Users</CardTitle>
          <UsersIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{regularUsers}</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Standard users</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminPage
