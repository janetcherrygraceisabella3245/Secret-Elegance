import { useListCaregivers, useDeleteCaregiver } from "@/hooks/useCaregivers"
import { useQueryClient } from "@tanstack/react-query"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function AdminCaregivers() {
  const queryClient = useQueryClient()
  const { data: caregivers = [], isLoading } = useListCaregivers()
  const deleteMutation = useDeleteCaregiver()

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to remove this caregiver?")) {
      await deleteMutation.mutateAsync({ id })
      queryClient.invalidateQueries({ queryKey: ["caregivers"] })
    }
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif mb-2">Caregivers</h1>
          <p className="text-muted-foreground">Manage your roster of professionals.</p>
        </div>
        <Button className="rounded-full gap-2">
          <Plus className="w-4 h-4" /> Add Caregiver
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead>Caregiver</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Rate</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {caregivers.map(c => (
              <TableRow key={c.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 overflow-hidden flex items-center justify-center shrink-0">
                      {c.profilePhoto ? <img src={c.profilePhoto} className="w-full h-full object-cover" /> : c.fullName.charAt(0)}
                    </div>
                    <div className="font-medium">{c.fullName}</div>
                  </div>
                </TableCell>
                <TableCell>{c.specialization}</TableCell>
                <TableCell>${c.hourlyRate}/hr</TableCell>
                <TableCell>
                  <Badge variant="outline" className={c.availability === 'Available' ? 'bg-green-50 text-green-700' : ''}>
                    {c.availability}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(c.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
