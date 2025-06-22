import { NextResponse } from "next/server"
import { updateProfileRole } from "@/lib/supabase-admin"

export async function POST(req: Request) {
  try {
    const { userId, newRole } = await req.json()

    if (!userId || !newRole) {
      return NextResponse.json({ success: false, error: "Missing userId or newRole" }, { status: 400 })
    }

    const { success, error } = await updateProfileRole(userId, newRole)

    if (error) {
      console.error("API Error updating profile role:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("API Exception updating profile role:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
