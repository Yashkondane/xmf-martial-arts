"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle2, XCircle, Users } from 'lucide-react'

export default function CreateStudentsPage() {
  const [creating, setCreating] = useState(false)
  const [results, setResults] = useState<{ success: number; failed: number; errors: string[] } | null>(null)

  const handleCreateAccounts = async () => {
    setCreating(true)
    setResults(null)

    try {
      const response = await fetch("/api/admin/create-student-accounts", {
        method: "POST",
      })

      const data = await response.json()

      if (response.ok) {
        setResults({
          success: data.created || 0,
          failed: data.errors?.length || 0,
          errors: data.errors || [],
        })
      } else {
        setResults({
          success: 0,
          failed: 1,
          errors: [data.error || "Failed to create accounts"],
        })
      }
    } catch (error) {
      setResults({
        success: 0,
        failed: 1,
        errors: [error instanceof Error ? error.message : "Unknown error occurred"],
      })
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-gray-900 py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        <Card className="bg-black/40 border-red-900/20 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <Users className="h-6 w-6 text-red-400" />
              Create Student Accounts
            </CardTitle>
            <CardDescription className="text-gray-400">
              Bulk create authentication accounts for all students with default password "123456"
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert className="bg-yellow-900/20 border-yellow-900/30">
              <AlertDescription className="text-yellow-200">
                This will create Supabase auth accounts for all unique student emails from your database.
                Each account will use the default password: <strong>123456</strong>
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <h3 className="text-white font-medium">What this will do:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Create auth accounts for all students in your spreadsheet</li>
                <li>Set default password "123456" for each account</li>
                <li>Auto-confirm emails (no verification needed)</li>
                <li>Skip duplicate emails automatically</li>
              </ul>
            </div>

            <Button
              onClick={handleCreateAccounts}
              disabled={creating}
              className="w-full bg-red-600 hover:bg-red-700"
              size="lg"
            >
              {creating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Accounts...
                </>
              ) : (
                "Create All Student Accounts"
              )}
            </Button>

            {results && (
              <div className="space-y-4 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-green-900/20 border-green-900/30">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                        <div>
                          <p className="text-2xl font-bold text-green-400">{results.success}</p>
                          <p className="text-sm text-gray-300">Created</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-red-900/20 border-red-900/30">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-5 w-5 text-red-400" />
                        <div>
                          <p className="text-2xl font-bold text-red-400">{results.failed}</p>
                          <p className="text-sm text-gray-300">Failed</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {results.errors.length > 0 && (
                  <Card className="bg-red-900/20 border-red-900/30">
                    <CardHeader>
                      <CardTitle className="text-white text-sm">Errors</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1 max-h-60 overflow-y-auto">
                        {results.errors.map((error, index) => (
                          <p key={index} className="text-xs text-red-300">
                            {error}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
