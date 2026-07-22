import { useLocation } from "wouter"
import { useBooking } from "@/hooks/BookingContext"
import { BookingLayout } from "@/components/BookingLayout"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"

export default function BookSummary() {
  const [, setLocation] = useLocation()
  const { bookingState } = useBooking()

  const hourlyRate = bookingState.hourlyRate || 250
  let estimatedTotal = hourlyRate

  if (bookingState.duration === "2hour") estimatedTotal = hourlyRate * 2
  if (bookingState.duration === "Overnight") estimatedTotal = hourlyRate * 10
  if (bookingState.duration === "FullDay") estimatedTotal = hourlyRate * 12

  const handleConfirm = () => {
    setLocation("/book/payment")
  }

  return (
      <BookingLayout currentStep={7} title="Summary">
        <h2 className="text-3xl font-serif text-center mb-8">Review Your Booking</h2>

        <div className="bg-secondary/20 rounded-[24px] p-6 md:p-8 mb-10 space-y-6">
          <div className="flex justify-between border-b border-border/50 pb-4">
            <span className="text-muted-foreground">Experience</span>
            <span className="font-medium text-right">{bookingState.service || "Passionate Encounter"}</span>
          </div>
          <div className="flex justify-between border-b border-border/50 pb-4">
            <span className="text-muted-foreground">Companion</span>
            <span className="font-medium text-right">{bookingState.caregiverName || "Best Available Match"}</span>
          </div>
          <div className="flex justify-between border-b border-border/50 pb-4">
            <span className="text-muted-foreground">Date & Time</span>
            <span className="font-medium text-right">
            {bookingState.date ? format(bookingState.date, "PPP") : "TBD"} at {bookingState.time || "—"}
          </span>
          </div>
          <div className="flex justify-between border-b border-border/50 pb-4">
            <span className="text-muted-foreground">Duration</span>
            <span className="font-medium text-right">{bookingState.duration || "Not selected"}</span>
          </div>
          <div className="flex justify-between pb-2">
            <span className="text-muted-foreground">Location</span>
            <span className="font-medium text-right">
            {bookingState.locationType === "Hotel"
                ? bookingState.locationDetails.hotelName
                : bookingState.locationDetails.homeAddress}
          </span>
          </div>

          <div className="bg-white rounded-xl p-6 mt-8 flex justify-between items-center shadow-sm">
            <div>
              <span className="font-serif text-xl">Total Estimate</span>
              <p className="text-xs text-muted-foreground">Based on ${hourlyRate}/hr rate</p>
            </div>
            <span className="font-serif text-3xl text-primary">${estimatedTotal}</span>
          </div>
        </div>

        <div className="flex justify-end border-t border-border/50 pt-6">
          <Button
              onClick={handleConfirm}
              size="lg"
              className="rounded-full px-12 py-6 text-lg"
          >
            Proceed to Payment
          </Button>
        </div>
      </BookingLayout>
  )
}