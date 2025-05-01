import { createClient } from "@supabase/supabase-js"

// Safely get environment variables with fallbacks
const getEnvVariable = (key: string): string | undefined => {
  if (typeof window !== "undefined") {
    // Client-side
    return process.env[`NEXT_PUBLIC_${key}`] || process.env[key]
  } else {
    // Server-side
    return process.env[key] || process.env[`NEXT_PUBLIC_${key}`]
  }
}

// Create a singleton instance for client-side
let supabaseInstance: ReturnType<typeof createClient> | null = null

export const getSupabase = () => {
  // Only create a new instance if one doesn't exist already
  if (supabaseInstance) return supabaseInstance

  // Get Supabase credentials with validation
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Validate credentials before attempting to create client
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase URL or Anon Key is missing. Please check your environment variables.", {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseAnonKey,
    })
    return createMockClient()
  }

  try {
    // Validate URL format before creating client
    new URL(supabaseUrl) // This will throw if URL is invalid

    // Create the actual client
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
    return supabaseInstance
  } catch (error) {
    console.error("Error initializing Supabase client:", error)
    return createMockClient()
  }
}

// Get the site URL dynamically based on environment
export const getSiteUrl = (): string => {
  // In production, use the configured site URL
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL

  if (configuredUrl) {
    try {
      // Validate URL format
      new URL(configuredUrl)
      return configuredUrl
    } catch (e) {
      console.warn("Invalid NEXT_PUBLIC_SITE_URL format:", configuredUrl)
      // Continue to fallbacks
    }
  }

  // In browser context, use the current origin
  if (typeof window !== "undefined") {
    return window.location.origin
  }

  // In development, use localhost as fallback
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000"
  }

  // Last resort fallback
  console.warn("Could not determine site URL, using empty string")
  return ""
}

// Create a mock client that won't throw errors but won't work either
const createMockClient = () => {
  console.warn("Using mock Supabase client. Authentication will not work.")

  const mockResponse = { data: null, error: { message: "Supabase client not properly initialized" } }

  return {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      signUp: async () => mockResponse,
      signInWithPassword: async () => mockResponse,
      signOut: async () => mockResponse,
      resetPasswordForEmail: async () => mockResponse,
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      getUser: async () => ({ data: { user: null }, error: null }),
      updateUser: async () => mockResponse,
      resend: async () => mockResponse,
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => mockResponse,
        }),
      }),
      insert: async () => mockResponse,
    }),
  } as any
}

export const supabase = getSupabase()

export async function signUp(email: string, password: string, userData: { name: string; program: string }) {
  try {
    const siteUrl = getSiteUrl()

    if (!siteUrl) {
      throw new Error("Site URL is not configured properly")
    }

    // Sign up the user with Supabase Auth and store user metadata
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: userData.name,
          program: userData.program,
        },
        emailRedirectTo: `${siteUrl}/dashboard`,
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

// Update the resetPasswordForEmail function to be more robust
export async function resetPasswordForEmail(email: string) {
  try {
    const siteUrl = getSiteUrl()

    if (!siteUrl) {
      throw new Error("Site URL is not configured properly")
    }

    // Construct the redirect URL
    const redirectTo = `${siteUrl}/update-password`

    console.log("Password reset redirect URL:", redirectTo)

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
