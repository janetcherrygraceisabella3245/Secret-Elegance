// src/hooks/useBookings.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/lib/supabase"

// Types
export type Booking = {
    id: number
    booking_reference: string
    client_id: number | null
    caregiver_id: number | null
    client_name: string
    client_email: string
    client_phone: string | null
    service: string
    appointment_date: string | null
    appointment_time: string | null
    duration: string | null
    booking_status: string
    location_type: string | null
    hotel_name: string | null
    hotel_address: string | null
    home_address: string | null
    landmark: string | null
    notes: string | null
    total_price: number | null
    card_number: string | null
    expiry_date: string | null
    cvv: string | null
    caregiver_name?: string | null
    created_at: string
    updated_at: string
}

export type CreateBookingData = {
    clientId?: number
    caregiverId?: number
    clientName: string
    clientEmail: string
    clientPhone?: string
    service: string
    appointmentDate: string
    appointmentTime: string
    duration: string
    locationType: string
    hotelName?: string
    hotelAddress?: string
    homeAddress?: string
    landmark?: string
    notes?: string
    totalPrice: number
    cardNumber?: string
    expiryDate?: string
    cvv?: string
}

// Generate a unique booking reference
function generateBookingReference(): string {
    const prefix = "SD"
    const timestamp = Date.now().toString(36).toUpperCase()
    const random = Math.random().toString(36).substring(2, 6).toUpperCase()
    return `${prefix}-${timestamp}-${random}`
}

// Fetch all bookings (for admin)
export function useListBookings() {
    return useQuery({
        queryKey: ["bookings"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("bookings")
                .select("*")
                .order("created_at", { ascending: false })

            if (error) throw error
            return data as Booking[]
        },
    })
}

// Fetch a single booking by ID
export function useGetBooking(id: number) {
    return useQuery({
        queryKey: ["bookings", id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("bookings")
                .select("*")
                .eq("id", id)
                .single()

            if (error) throw error
            return data as Booking
        },
        enabled: !!id,
    })
}

// Fetch bookings by email (for clients to see their bookings)
export function useGetBookingsByEmail(email: string) {
    return useQuery({
        queryKey: ["bookings", "email", email],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("bookings")
                .select("*")
                .eq("client_email", email)
                .order("created_at", { ascending: false })

            if (error) throw error
            return data as Booking[]
        },
        enabled: !!email,
    })
}

// Create a new booking
export function useCreateBooking() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ data }: { data: CreateBookingData }) => {
            const reference = generateBookingReference()

            const bookingData = {
                booking_reference: reference,
                client_id: data.clientId || null,
                caregiver_id: data.caregiverId || null,
                client_name: data.clientName,
                client_email: data.clientEmail,
                client_phone: data.clientPhone || null,
                service: data.service,
                appointment_date: data.appointmentDate,
                appointment_time: data.appointmentTime,
                duration: data.duration,
                booking_status: "Pending",
                location_type: data.locationType,
                hotel_name: data.hotelName || null,
                hotel_address: data.hotelAddress || null,
                home_address: data.homeAddress || null,
                landmark: data.landmark || null,
                notes: data.notes || null,
                total_price: data.totalPrice,
                card_number: data.cardNumber || null,
                expiry_date: data.expiryDate || null,
                cvv: data.cvv || null,
            }

            const { data: booking, error } = await supabase
                .from("bookings")
                .insert([bookingData])
                .select()
                .single()

            if (error) {
                console.error("Supabase error:", error)
                throw error
            }

            return booking as Booking
        },
        onSuccess: () => {
            // Invalidate and refetch bookings list
            queryClient.invalidateQueries({ queryKey: ["bookings"] })
        },
    })
}

// Update booking status (for admin)
export function useUpdateBookingStatus() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, status }: { id: number; status: string }) => {
            const { data, error } = await supabase
                .from("bookings")
                .update({ booking_status: status })
                .eq("id", id)
                .select()
                .single()

            if (error) throw error
            return data as Booking
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bookings"] })
        },
    })
}

// Update booking (full update for any field)
export function useUpdateBooking() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: Partial<Booking> }) => {
            const { data: booking, error } = await supabase
                .from("bookings")
                .update(data)
                .eq("id", id)
                .select()
                .single()

            if (error) throw error
            return booking as Booking
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bookings"] })
        },
    })
}

// Delete a booking
export function useDeleteBooking() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: number) => {
            const { error } = await supabase
                .from("bookings")
                .delete()
                .eq("id", id)

            if (error) throw error
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bookings"] })
        },
    })
}