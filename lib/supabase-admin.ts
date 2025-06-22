import { createClient } from "@supabase/supabase-js"

// Note: Supabase Admin client should ONLY be used on the server-side
// It uses the service role key which bypasses Row Level Security (RLS)
// and should never be exposed to the client.

const supabaseAdminUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseAdminUrl || !supabaseServiceRoleKey) {
  throw new Error("Missing Supabase environment variables for admin client.")
}

export const supabaseAdmin = createClient(supabaseAdminUrl, supabaseServiceRoleKey, {
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

export async function updateProfileAdmin(
  id: string,
  updates: { name?: string; email?: string; program?: string; belt?: string; phone_number?: string; role?: string },
) {
  const { data, error } = await supabaseAdmin.from("profiles").update(updates).eq("id", id).select().single()
  if (error) {
    console.error("Error updating profile (admin):", error)
    return { profile: null, error }
  }
  return { profile: data, error: null }
}

export async function createNewUserAndProfile(
  email: string,
  password: string,
  name: string,
  program: string,
  phone_number?: string,
  role = "user",
) {
  // Create user in auth.users table
  const { data: userAuthData, error: userAuthError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Automatically confirm email for admin-created users
    user_metadata: { name, program, phone_number },
  })

  if (userAuthError) {
    console.error("Error creating user auth entry:", userAuthError)
    return { user: null, profile: null, error: userAuthError }
  }

  // Create profile entry in public.profiles table
  const { data: profileData, error: profileError } = await supabaseAdmin
    .from("profiles")
    .insert({
      id: userAuthData.user?.id,
      name,
      email,
      program,
      phone_number,
      role,
    })
    .select()
    .single()

  if (profileError) {
    console.error("Error creating profile entry:", profileError)
    // If profile creation fails, consider deleting the auth user to prevent orphaned entries
    await supabaseAdmin.auth.admin.deleteUser(userAuthData.user!.id)
    return { user: null, profile: null, error: profileError }
  }

  return { user: userAuthData.user, profile: profileData, error: null }
}

export async function deleteUserAndProfile(userId: string) {
  // Delete profile first (if RLS allows, or use admin client)
  const { error: profileError } = await supabaseAdmin.from("profiles").delete().eq("id", userId)
  if (profileError) {
    console.error("Error deleting profile:", profileError)
    return { success: false, error: profileError }
  }

  // Then delete user from auth.users
  const { error: userAuthError } = await supabaseAdmin.auth.admin.deleteUser(userId)
  if (userAuthError) {
    console.error("Error deleting user auth entry:", userAuthError)
    return { success: false, error: userAuthError }
  }

  return { success: true, error: null }
}
