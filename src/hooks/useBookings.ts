import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Booking, BookingRow } from '@/lib/database.types'

function toBooking(r: BookingRow): Booking {
  return {
    id: r.id,
    bookingReference: r.booking_reference,
    clientId: r.client_id,
    caregiverId: r.caregiver_id,
    clientName: r.client_name,
    clientEmail: r.client_email,
    clientPhone: r.client_phone,
    service: r.service,
    appointmentDate: r.appointment_date,
    appointmentTime: r.appointment_time,
    duration: r.duration,
    bookingStatus: r.booking_status,
    locationType: r.location_type,
    homeAddress: r.home_address,
    landmark: r.landmark,
    hospitalName: r.hospital_name,
    hospitalAddress: r.hospital_address,
    roomNumber: r.room_number,
    notes: r.notes,
    totalPrice: r.total_price,
    createdAt: r.created_at,
  }
}

export function useListBookings() {
  return useQuery<Booking[]>({
    queryKey: ['bookings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return (data as BookingRow[]).map(toBooking)
    },
  })
}

export function useCreateBooking() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ data: payload }: {
      data: {
        clientId?: number
        caregiverId?: number
        clientName: string
        clientEmail: string
        clientPhone: string
        service: string
        appointmentDate: string
        appointmentTime: string
        duration: string
        locationType: string
        homeAddress?: string
        landmark?: string
        hospitalName?: string
        hospitalAddress?: string
        roomNumber?: string
        notes?: string
        totalPrice?: number
      }
    }): Promise<Booking> => {
      // Generate booking reference server-side equivalent
      const ref = `SE-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          booking_reference: ref,
          client_id: payload.clientId ?? null,
          caregiver_id: payload.caregiverId ?? null,
          client_name: payload.clientName,
          client_email: payload.clientEmail,
          client_phone: payload.clientPhone,
          service: payload.service,
          appointment_date: payload.appointmentDate,
          appointment_time: payload.appointmentTime,
          duration: payload.duration,
          booking_status: 'Pending',
          location_type: payload.locationType,
          home_address: payload.homeAddress ?? null,
          landmark: payload.landmark ?? null,
          hospital_name: payload.hospitalName ?? null,
          hospital_address: payload.hospitalAddress ?? null,
          room_number: payload.roomNumber ?? null,
          notes: payload.notes ?? null,
          total_price: payload.totalPrice ?? null,
        })
        .select()
        .single()
      if (error) throw error
      return toBooking(data as BookingRow)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
  })
}

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, data: payload }: { id: number; data: { status: string } }) => {
      const { error } = await supabase
        .from('bookings')
        .update({ booking_status: payload.status })
        .eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] })
    },
  })
}
