import { useState } from "react"
import { useLocation } from "wouter"
import { useBooking } from "@/hooks/BookingContext"
import { BookingLayout } from "@/components/BookingLayout"
import { Button } from "@/components/ui/button"

export default function BookTime() {
  const [, setLocation] = useLocation()
  const { bookingState, updateBookingState } = useBooking()
  const [time, setTime] = useState<string>(bookingState.time)

  const timeSlots = [
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM",
    "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"
  ]

  const handleNext = () => {
    if (time) {
      updateBookingState({ time })
      setLocation("/book/duration")
    }
  }

  return (
    <BookingLayout currentStep={4} title="Choose Time">
      <h2 className="text-3xl font-serif text-center mb-2">Select a start time</h2>
      <p className="text-muted-foreground text-center mb-8">When should the caregiver arrive?</p>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-10">
        {timeSlots.map(slot => (
          <Button
            key={slot}
            variant={time === slot ? "default" : "outline"}
            className={`rounded-xl h-14 ${time === slot ? "shadow-md ring-2 ring-primary/20" : ""}`}
            onClick={() => setTime(slot)}
          >
            {slot}
          </Button>
        ))}
      </div>

      <div className="flex justify-end border-t border-border/50 pt-6">
        <Button 
          onClick={handleNext} 
          disabled={!time}
          size="lg" 
          className="rounded-full px-10"
        >
          Continue
        </Button>
      </div>
    </BookingLayout>
  )
}
