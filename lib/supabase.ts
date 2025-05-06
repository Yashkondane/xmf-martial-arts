import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for the browser
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create a singleton instance for client-side
let supabaseInstance: ReturnType<typeof createClient> | null = null

export const getSupabase = () => {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseInstance
}

export const supabase = getSupabase()

export async function signUp(email: string, password: string, userData: { name: string; program: string }) {
  try {
    // Sign up the user with Supabase Auth and store user metadata
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: userData.name,
          program: userData.program,
        },
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    })

    if (authError) throw authError

    // Return the user without trying to create a profile immediately
    // The profile will be created when the user first accesses the dashboard
    return { user: authData.user, error: null }
  } catch (error: any) {
    console.error("Error signing up:", error)
    return { user: null, error }
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    return { user: data.user, error: null }
  } catch (error) {
    console.error("Error signing in:", error)
    return { user: null, error }
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error("Error signing out:", error)
    return { error }
  }
}

export async function resetPasswordForEmail(email: string, redirectTo: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    })

    if (error) throw error

    return { error: null }
  } catch (error) {
    console.error("Error resetting password:", error)
    return { error }
  }
}

export async function getUserProfile(userId: string) {
  try {
    // First check if the profile exists
    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

    if (error) {
      // If profile doesn't exist, create it from user metadata
      if (error.code === "PGRST116") {
        const { data: userData } = await supabase.auth.getUser()

        if (userData?.user) {
          const metadata = userData.user.user_metadata || {}

          // Try to create the profile
          const { error: insertError } = await supabase.from("profiles").insert({
            id: userId,
            name: metadata.name || "User",
            email: userData.user.email || "",
            program: metadata.program || "taekwondo",
          })

          if (insertError) {
            console.error("Error creating profile:", insertError)
          } else {
            // Try fetching again after creating
            const { data: newData, error: newError } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", userId)
              .single()

            if (!newError) {
              return { profile: newData, error: null }
            }
          }

          // If we still can't fetch, return a basic profile
          return {
            profile: {
              id: userId,
              name: metadata.name || "User",
              email: userData.user.email,
              program: metadata.program || "taekwondo",
            },
            error: null,
          }
        }
      }

      // For other errors, return null profile
      console.error("Error fetching profile:", error)
      return { profile: null, error }
    }

    return { profile: data, error: null }
  } catch (error) {
    console.error("Error in getUserProfile:", error)
    return { profile: null, error }
  }
}
