import { useListBookings, useUpdateBookingStatus } from "@/hooks/useBookings"
import { useQueryClient } from "@tanstack/react-query"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function AdminBookings() {
  const queryClient = useQueryClient()
  const { data: bookings = [], isLoading } = useListBookings()
  const updateStatus = useUpdateBookingStatus()

  const handleUpdate = async (id: number, status: string) => {
    await updateStatus.mutateAsync({ id, data: { status } })
    queryClient.invalidateQueries({ queryKey: ["bookings"] })
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif mb-2">Bookings</h1>
        <p className="text-muted-foreground">Manage and update care reservations.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead>Ref</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map(b => (
              <TableRow key={b.id}>
                <TableCell className="font-mono text-xs">{b.bookingReference || `REF-${b.id}`}</TableCell>
                <TableCell className="font-medium">{b.clientName}</TableCell>
                <TableCell>{b.service}</TableCell>
                <TableCell>
                  <div className="text-sm">{new Date(b.appointmentDate).toLocaleDateString()}</div>
                  <div className="text-xs text-muted-foreground">{b.appointmentTime} ({b.duration})</div>
                </TableCell>
                <TableCell>
                  <Badge variant={b.bookingStatus === 'Confirmed' ? 'default' : b.bookingStatus === 'Pending' ? 'secondary' : 'outline'}>
                    {b.bookingStatus}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {b.bookingStatus === "Pending" && (
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" className="h-8" onClick={() => handleUpdate(b.id, "Confirmed")}>Confirm</Button>
                      <Button size="sm" variant="destructive" className="h-8" onClick={() => handleUpdate(b.id, "Cancelled")}>Cancel</Button>
                    </div>
                  )}
                  {b.bookingStatus === "Confirmed" && (
                    <Button size="sm" variant="outline" className="h-8 border-green-200 text-green-700 hover:bg-green-50" onClick={() => handleUpdate(b.id, "Completed")}>
                      Mark Complete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {bookings.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No bookings found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
