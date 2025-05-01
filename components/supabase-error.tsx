import Link from "next/link"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SupabaseError() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
        <div className="bg-red-100 rounded-full p-3 inline-flex mb-4">
          <AlertCircle className="h-6 w-6 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Configuration Error</h2>
        <p className="text-gray-600 mb-6">
          The Supabase client could not be initialized. Please check your environment variables and make sure they are
          properly configured.
        </p>
        <div className="bg-gray-100 p-4 rounded-md text-left mb-6">
          <p className="text-sm font-mono mb-2">Required environment variables:</p>
          <ul className="list-disc list-inside text-sm font-mono text-gray-700">
            <li>NEXT_PUBLIC_SUPABASE_URL</li>
            <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
            <li>NEXT_PUBLIC_SITE_URL (for production)</li>
          </ul>
        </div>
        <div className="space-y-4">
          <Link href="/">
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Return to Home</Button>
          </Link>
          <p className="text-sm text-gray-500">
            If you are the site administrator, please check the console for more detailed error information.
          </p>
        </div>
      </div>
    </div>
  )
}
