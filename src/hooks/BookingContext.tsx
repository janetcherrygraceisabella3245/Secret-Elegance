import * as React from "react"

export interface BookingState {
  service: string
  caregiverId?: number
  caregiverName?: string
  date: Date | undefined
  time: string
  duration: string
  locationType: "Home" | "Hospital"
  locationDetails: {
    hospitalName?: string
    hospitalAddress?: string
    roomNumber?: string
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
  locationType: "Home",
  locationDetails: {}
}

const BookingContext = React.createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookingState, setBookingState] = React.useState<BookingState>(() => {
    try {
      const saved = localStorage.getItem("secret_elegance_booking")
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
    localStorage.setItem("secret_elegance_booking", JSON.stringify(bookingState))
  }, [bookingState])

  const updateBookingState = (updates: Partial<BookingState>) => {
    setBookingState(prev => ({ ...prev, ...updates }))
  }

  const resetBookingState = () => {
    setBookingState(defaultState)
    localStorage.removeItem("secret_elegance_booking")
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
