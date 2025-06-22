"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { getAllProfiles, updateProfileRole, deleteProfile } from "@/lib/supabase-admin"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontalIcon, EditIcon, TrashIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface Profile {
  id: string
  email: string
  name: string | null
  program: string | null
  belt: string | null
  phone_number: string | null
  role: string
}

export default function AdminProfilesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null)
  const [editForm, setEditForm] = useState({ name: "", program: "", belt: "", phone_number: "", role: "" })
  const { toast } = useToast()

  const fetchProfiles = async () => {
    setLoading(true)
    setError(null)
    try {
      const { profiles: fetchedProfiles, error: fetchError } = await getAllProfiles()
      if (fetchError) {
        setError(fetchError.message || "Failed to fetch profiles.")
        console.error("Error fetching profiles:", fetchError)
        setProfiles([])
      } else {
        setProfiles(fetchedProfiles || [])
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred while fetching profiles.")
      console.error("Unexpected error in fetchProfiles:", err)
      setProfiles([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfiles()
  }, [])

  const handleEditClick = (profile: Profile) => {
    setCurrentProfile(profile)
    setEditForm({
      name: profile.name || "",
      program: profile.program || "",
      belt: profile.belt || "",
      phone_number: profile.phone_number || "",
      role: profile.role,
    })
    setIsEditDialogOpen(true)
  }

  const handleDeleteClick = (profile: Profile) => {
    setCurrentProfile(profile)
    setIsDeleteDialogOpen(true)
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentProfile) return

    setLoading(true)
    try {
      const { success, error: updateError } = await updateProfileRole(currentProfile.id, editForm.role)

      if (updateError) {
        toast({
          title: "Error updating profile",
          description: updateError.message || "Failed to update profile role.",
          variant: "destructive",
        })
        console.error("Error updating profile:", updateError)
      } else {
        toast({
          title: "Profile updated",
          description: `Profile for ${currentProfile.email} updated successfully.`,
        })
        setIsEditDialogOpen(false)
        await fetchProfiles() // Re-fetch profiles to show updated data
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "An unexpected error occurred.",
        variant: "destructive",
      })
      console.error("Unexpected error during profile update:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!currentProfile) return

    setLoading(true)
    try {
      const { success, error: deleteError } = await deleteProfile(currentProfile.id)

      if (deleteError) {
        toast({
          title: "Error deleting profile",
          description: deleteError.message || "Failed to delete profile.",
          variant: "destructive",
        })
        console.error("Error deleting profile:", deleteError)
      } else {
        toast({
          title: "Profile deleted",
          description: `Profile for ${currentProfile.email} deleted successfully.`,
        })
        setIsDeleteDialogOpen(false)
        await fetchProfiles() // Re-fetch profiles to show updated data
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "An unexpected error occurred.",
        variant: "destructive",
      })
      console.error("Unexpected error during profile deletion:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
        <p>Loading profiles...</p>
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
    <Card>
      <CardHeader>
        <CardTitle>User Profiles</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Belt</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profiles.map((profile) => (
              <TableRow key={profile.id}>
                <TableCell>{profile.name || "N/A"}</TableCell>
                <TableCell>{profile.email}</TableCell>
                <TableCell>{profile.program || "N/A"}</TableCell>
                <TableCell>{profile.belt || "N/A"}</TableCell>
                <TableCell>{profile.phone_number || "N/A"}</TableCell>
                <TableCell>{profile.role}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontalIcon className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditClick(profile)}>
                        <EditIcon className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteClick(profile)}>
                        <TrashIcon className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Edit Profile Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="col-span-3"
                  disabled // Disabling name/program/belt/phone for now, focusing on role
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-program" className="text-right">
                  Program
                </Label>
                <Input
                  id="edit-program"
                  value={editForm.program}
                  onChange={(e) => setEditForm({ ...editForm, program: e.target.value })}
                  className="col-span-3"
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-belt" className="text-right">
                  Belt
                </Label>
                <Input
                  id="edit-belt"
                  value={editForm.belt}
                  onChange={(e) => setEditForm({ ...editForm, belt: e.target.value })}
                  className="col-span-3"
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="edit-phone"
                  value={editForm.phone_number}
                  onChange={(e) => setEditForm({ ...editForm, phone_number: e.target.value })}
                  className="col-span-3"
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-right">
                  Role
                </Label>
                <Select value={editForm.role} onValueChange={(value) => setEditForm({ ...editForm, role: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save changes"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Profile Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              Are you sure you want to delete the profile for **{currentProfile?.email}**? This action cannot be undone.
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteConfirm} disabled={loading}>
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
