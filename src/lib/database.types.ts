// TypeScript types mirroring the Supabase schema.
// Supabase columns are snake_case; hooks transform them to camelCase
// so that existing page components work without changes.

export interface Database {
  public: {
    Tables: {
      caregivers: { Row: CaregiverRow; Insert: Omit<CaregiverRow, 'id' | 'created_at'>; Update: Partial<CaregiverRow> }
      bookings:   { Row: BookingRow;   Insert: Omit<BookingRow,   'id' | 'created_at' | 'booking_reference'>; Update: Partial<BookingRow> }
      clients:    { Row: ClientRow;    Insert: Omit<ClientRow,    'id' | 'created_at'>; Update: Partial<ClientRow> }
      messages:   { Row: MessageRow;  Insert: Omit<MessageRow,   'id' | 'created_at'>; Update: Partial<MessageRow> }
      reviews:    { Row: ReviewRow;   Insert: Omit<ReviewRow,    'id' | 'created_at'>; Update: Partial<ReviewRow> }
      activity:   { Row: ActivityRow; Insert: Omit<ActivityRow,  'id' | 'created_at'>; Update: Partial<ActivityRow> }
    }
  }
}

export interface CaregiverRow {
  id: number
  full_name: string
  specialization: string
  profile_photo: string | null
  rating: number
  hourly_rate: number
  years_experience: number | null
  bio: string | null
  availability: string
  certifications: string | null
  languages: string | null
  created_at: string
}

export interface BookingRow {
  id: number
  booking_reference: string
  client_id: number | null
  caregiver_id: number | null
  client_name: string
  client_email: string
  client_phone: string
  service: string
  appointment_date: string
  appointment_time: string
  duration: string
  booking_status: string
  location_type: string
  home_address: string | null
  landmark: string | null
  hospital_name: string | null
  hospital_address: string | null
  room_number: string | null
  notes: string | null
  total_price: number | null
  created_at: string
}

export interface ClientRow {
  id: number
  full_name: string
  email: string
  phone: string | null
  address: string | null
  created_at: string
}

export interface MessageRow {
  id: number
  booking_id: number
  sender: string
  message: string
  created_at: string
}

export interface ReviewRow {
  id: number
  caregiver_id: number
  rating: number
  review_text: string | null
  reviewer_name: string | null
  created_at: string
}

export interface ActivityRow {
  id: number
  description: string
  entity_type: string | null
  entity_id: number | null
  created_at: string
}

// ─── camelCase app types (what pages see) ────────────────────────────────────

export interface Caregiver {
  id: number
  fullName: string
  specialization: string
  profilePhoto: string | null
  rating: number
  hourlyRate: number
  yearsExperience: number | null
  bio: string | null
  availability: string
  certifications: string | null
  languages: string | null
}

export interface Booking {
  id: number
  bookingReference: string
  clientId: number | null
  caregiverId: number | null
  clientName: string
  clientEmail: string
  clientPhone: string
  service: string
  appointmentDate: string
  appointmentTime: string
  duration: string
  bookingStatus: string
  locationType: string
  homeAddress: string | null
  landmark: string | null
  hospitalName: string | null
  hospitalAddress: string | null
  roomNumber: string | null
  notes: string | null
  totalPrice: number | null
  createdAt: string
}

export interface Client {
  id: number
  fullName: string
  email: string
  phone: string | null
  address: string | null
  createdAt: string
}

export interface Message {
  id: number
  bookingId: number
  sender: string
  message: string
  createdAt: string
}

export interface Review {
  id: number
  caregiverId: number
  rating: number
  reviewText: string | null
  reviewerName: string | null
  createdAt: string
}

export interface Activity {
  id: number
  description: string
  createdAt: string
}

export interface AdminStats {
  totalRevenue: number
  confirmedBookings: number
  pendingBookings: number
  completedBookings: number
  totalClients: number
  totalCaregivers: number
}
