import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { AdminStats, Activity, ActivityRow } from '@/lib/database.types'

export function useGetAdminStats() {
  return useQuery<AdminStats>({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [
        { count: totalCaregivers },
        { count: totalClients },
        { data: bookings },
      ] = await Promise.all([
        supabase.from('caregivers').select('*', { count: 'exact', head: true }),
        supabase.from('clients').select('*', { count: 'exact', head: true }),
        supabase.from('bookings').select('booking_status, total_price'),
      ])

      const allBookings = (bookings ?? []) as { booking_status: string; total_price: number | null }[]
      const confirmedBookings = allBookings.filter(b => b.booking_status === 'Confirmed').length
      const pendingBookings = allBookings.filter(b => b.booking_status === 'Pending').length
      const completedBookings = allBookings.filter(b => b.booking_status === 'Completed').length
      const totalRevenue = allBookings
        .filter(b => b.booking_status === 'Completed')
        .reduce((sum, b) => sum + (b.total_price ?? 0), 0)

      return {
        totalRevenue,
        confirmedBookings,
        pendingBookings,
        completedBookings,
        totalClients: totalClients ?? 0,
        totalCaregivers: totalCaregivers ?? 0,
      }
    },
  })
}

export function useGetRecentActivity() {
  return useQuery<Activity[]>({
    queryKey: ['activity'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('activity')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20)
      if (error) throw error
      return (data as ActivityRow[]).map(r => ({
        id: r.id,
        description: r.description,
        createdAt: r.created_at,
      }))
    },
  })
}
