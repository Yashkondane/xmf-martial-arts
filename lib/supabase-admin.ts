import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  throw new Error("Missing environment variable NEXT_PUBLIC_SUPABASE_URL")
}

if (!supabaseServiceRoleKey) {
  throw new Error("Missing environment variable SUPABASE_SERVICE_ROLE_KEY")
}

// Create a single supabase client for the server with service role key
// This client bypasses Row Level Security (RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

export async function getAllProfiles() {
  const { data, error } = await supabaseAdmin.from("profiles").select("*")
  if (error) {
    console.error("Error fetching all profiles:", error)
    return { profiles: null, error }
  }
  return { profiles: data, error: null }
}

export async function updateProfileRole(userId: string, newRole: string) {
  const { data, error } = await supabaseAdmin.from("profiles").update({ role: newRole }).eq("id", userId)
  if (error) {
    console.error("Error updating profile role:", error)
    return { success: false, error }
  }
  return { success: true, data, error: null }
}

export async function deleteProfile(userId: string) {
  // First, delete the user from Supabase Auth
  const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(userId)

  if (authError) {
    console.error("Error deleting user from auth:", authError)
    return { success: false, error: authError }
  }

  // Then, delete the profile from the profiles table
  const { error: dbError } = await supabaseAdmin.from("profiles").delete().eq("id", userId)

  if (dbError) {
    console.error("Error deleting profile from database:", dbError)
    return { success: false, error: dbError }
  }

  return { success: true, error: null }
}
