"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontalIcon, EditIcon, TrashIcon, PlusCircleIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase" // Corrected import path
import { useToast } from "@/hooks/use-toast"

interface Event {
  id: string
  title: string
  description: string | null
  date: string
  time: string
  location: string | null
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null)
  const [form, setForm] = useState({ title: "", description: "", date: "", time: "", location: "" })
  // Removed: const supabase = createClient() as it's now imported directly
  const { toast } = useToast()

  const fetchEvents = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: fetchError } = await supabase.from("events").select("*").order("date", { ascending: true })
      if (fetchError) {
        setError(fetchError.message || "Failed to fetch events.")
        console.error("Error fetching events:", fetchError)
        setEvents([])
      } else {
        setEvents(data || [])
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred while fetching events.")
      console.error("Unexpected error in fetchEvents:", err)
      setEvents([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const handleAddEditClick = (event?: Event) => {
    if (event) {
      setCurrentEvent(event)
      setForm({
        title: event.title,
        description: event.description || "",
        date: event.date,
        time: event.time,
        location: event.location || "",
      })
    } else {
      setCurrentEvent(null)
      setForm({ title: "", description: "", date: "", time: "", location: "" })
    }
    setIsAddEditDialogOpen(true)
  }

  const handleDeleteClick = (event: Event) => {
    setCurrentEvent(event)
    setIsDeleteDialogOpen(true)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setForm((prev) => ({ ...prev, [id]: value }))
  }

  const handleAddEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (currentEvent) {
        // Update event
        const { data, error: updateError } = await supabase
          .from("events")
          .update(form)
          .eq("id", currentEvent.id)
          .select()
          .single()

        if (updateError) {
          toast({
            title: "Error updating event",
            description: updateError.message || "Failed to update event.",
            variant: "destructive",
          })
          console.error("Error updating event:", updateError)
        } else {
          toast({
            title: "Event updated",
            description: `Event "${data?.title}" updated successfully.`,
          })
          setIsAddEditDialogOpen(false)
          await fetchEvents()
        }
      } else {
        // Add new event
        const { data, error: insertError } = await supabase.from("events").insert(form).select().single()

        if (insertError) {
          toast({
            title: "Error adding event",
            description: insertError.message || "Failed to add event.",
            variant: "destructive",
          })
          console.error("Error adding event:", insertError)
        } else {
          toast({
            title: "Event added",
            description: `Event "${data?.title}" added successfully.`,
          })
          setIsAddEditDialogOpen(false)
          await fetchEvents()
        }
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "An unexpected error occurred.",
        variant: "destructive",
      })
      console.error("Unexpected error during event add/edit:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!currentEvent) return

    setLoading(true)
    try {
      const { error: deleteError } = await supabase.from("events").delete().eq("id", currentEvent.id)

      if (deleteError) {
        toast({
          title: "Error deleting event",
          description: deleteError.message || "Failed to delete event.",
          variant: "destructive",
        })
        console.error("Error deleting event:", deleteError)
      } else {
        toast({
          title: "Event deleted",
          description: `Event "${currentEvent.title}" deleted successfully.`,
        })
        setIsDeleteDialogOpen(false)
        await fetchEvents()
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "An unexpected error occurred.",
        variant: "destructive",
      })
      console.error("Unexpected error during event deletion:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
        <p>Loading events...</p>
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
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Events Management</CardTitle>
        <Button onClick={() => handleAddEditClick()}>
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.time}</TableCell>
                <TableCell>{event.location || "N/A"}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontalIcon className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleAddEditClick(event)}>
                        <EditIcon className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteClick(event)}>
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

        {/* Add/Edit Event Dialog */}
        <Dialog open={isAddEditDialogOpen} onOpenChange={setIsAddEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentEvent ? "Edit Event" : "Add New Event"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddEditSubmit} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input id="title" value={form.title} onChange={handleFormChange} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={handleFormChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={handleFormChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={form.time}
                  onChange={handleFormChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input id="location" value={form.location} onChange={handleFormChange} className="col-span-3" />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? (currentEvent ? "Saving..." : "Adding...") : currentEvent ? "Save changes" : "Add Event"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Event Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              Are you sure you want to delete the event "**{currentEvent?.title}**" on **{currentEvent?.date}**? This
              action cannot be undone.
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
