"use server"

import { getAllProfiles, updateProfileAdmin, createNewUserAndProfile, deleteUserAndProfile } from "@/lib/supabase-admin"
import { revalidatePath } from "next/cache"

export async function fetchAllProfilesAction() {
  const { profiles, error } = await getAllProfiles()
  if (error) {
    return { success: false, message: error.message, profiles: null }
  }
  return { success: true, profiles, message: "Profiles fetched successfully." }
}

export async function updateProfileAction(formData: FormData) {
  const id = formData.get("id") as string
  const name = formData.get("name") as string
  const program = formData.get("program") as string
  const phone_number = formData.get("phone_number") as string | undefined
  const belt = formData.get("belt") as string | undefined
  const role = formData.get("role") as string

  const updates = { name, program, phone_number, belt, role }

  const { profile, error } = await updateProfileAdmin(id, updates)

  if (error) {
    return { success: false, message: error.message }
  }

  revalidatePath("/admin/profiles")
  return { success: true, message: "Profile updated successfully!", profile }
}

export async function addProfileAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string
  const program = formData.get("program") as string
  const phone_number = formData.get("phone_number") as string | undefined
  const role = formData.get("role") as string

  if (!email || !password || !name || !program) {
    return { success: false, message: "Email, password, name, and program are required." }
  }

  const { user, profile, error } = await createNewUserAndProfile(email, password, name, program, phone_number, role)

  if (error) {
    return { success: false, message: error.message }
  }

  revalidatePath("/admin/profiles")
  return { success: true, message: "User added successfully!", user, profile }
}

export async function deleteProfileAction(userId: string) {
  const { success, error } = await deleteUserAndProfile(userId)

  if (error) {
    return { success: false, message: error.message }
  }

  revalidatePath("/admin/profiles")
  return { success: true, message: "User deleted successfully!" }
}
