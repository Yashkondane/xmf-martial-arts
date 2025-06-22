import { fetchAllProfilesAction } from "./actions"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ProfileActions from "./profile-actions" // Client component for edit/delete
import AddProfileForm from "./add-profile-form" // Client component for adding

export const dynamic = "force-dynamic" // Ensure data is always fresh

export default async function AdminProfilesPage() {
  const { profiles, success, message } = await fetchAllProfilesAction()

  if (!success) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Manage Profiles</h2>
        <p className="text-red-500">Error: {message}</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Manage Profiles</h2>
        <AddProfileForm /> {/* Button to open add user dialog */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All User Profiles</CardTitle>
          <CardDescription>View and manage all registered user profiles.</CardDescription>
        </CardHeader>
        <CardContent>
          {profiles && profiles.length > 0 ? (
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
                {profiles.map((profile: any) => (
                  <TableRow key={profile.id}>
                    <TableCell className="font-medium">{profile.name}</TableCell>
                    <TableCell>{profile.email}</TableCell>
                    <TableCell className="capitalize">{profile.program}</TableCell>
                    <TableCell className="capitalize">{profile.belt || "N/A"}</TableCell>
                    <TableCell>{profile.phone_number || "N/A"}</TableCell>
                    <TableCell className="capitalize">{profile.role}</TableCell>
                    <TableCell className="text-right">
                      <ProfileActions profile={profile} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center text-gray-500 py-8">No profiles found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
