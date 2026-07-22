import * as React from "react"

export interface BookingState {
  service: string
  caregiverId?: number
  caregiverName?: string
  hourlyRate?: number
  date: Date | undefined
  time: string
  duration: string
  locationType: "Hotel" | "Residence"
  locationDetails: {
    hotelName?: string
    hotelAddress?: string
    homeAddress?: string
    landmark?: string
    notes?: string
  }
}

interface BookingContextType {
  bookingState: BookingState
  updateBookingState: (updates: Partial<BookingState>) => void
  resetBookingState: () => void
}

const defaultState: BookingState = {
  service: "",
  date: undefined,
  time: "",
  duration: "",
  locationType: "Hotel",
  locationDetails: {}
}

const BookingContext = React.createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookingState, setBookingState] = React.useState<BookingState>(() => {
    try {
      const saved = localStorage.getItem("secret_desires_booking")
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.date) parsed.date = new Date(parsed.date)
        return parsed
      }
    } catch (e) {
      console.error(e)
    }
    return defaultState
  })

  React.useEffect(() => {
    localStorage.setItem("secret_desires_booking", JSON.stringify(bookingState))
  }, [bookingState])

  const updateBookingState = (updates: Partial<BookingState>) => {
    setBookingState(prev => ({ ...prev, ...updates }))
  }

  const resetBookingState = () => {
    setBookingState(defaultState)
    localStorage.removeItem("secret_desires_booking")
  }

  return (
      <BookingContext.Provider value={{ bookingState, updateBookingState, resetBookingState }}>
        {children}
      </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = React.useContext(BookingContext)
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider")
  }
  return context
}