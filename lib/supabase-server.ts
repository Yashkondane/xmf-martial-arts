import { createServerClient as createClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export function createServerClient() {
  const cookieStore = cookies()

  return createClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch (error) {
          // The `cookies().set()` method can only be called in a Server Context.
          // We're only interested in deleting the cookie and not setting it.
        }
      },
      remove(name: string, options: any) {
        try {
          cookieStore.set({ name, value: "", ...options })
        } catch (error) {
          // The `cookies().set()` method can only be called in a Server Context.
          // We're only interested in deleting the cookie and not setting it.
        }
      },
    },
  })
}
