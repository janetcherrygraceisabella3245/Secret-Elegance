import { useLocation } from "wouter"
import { useBooking } from "@/hooks/BookingContext"
import { BookingLayout } from "@/components/BookingLayout"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"

export default function BookSummary() {
  const [, setLocation] = useLocation()
  const { bookingState } = useBooking()

  // Base price calculation logic just for demo
  let basePrice = 45;
  if (bookingState.duration === "Half Day") basePrice = 250;
  if (bookingState.duration === "Full Day") basePrice = 450;
  if (bookingState.duration === "Weekly") basePrice = 3000;

  return (
    <BookingLayout currentStep={7} title="Summary">
      <h2 className="text-3xl font-serif text-center mb-8">Review your booking</h2>

      <div className="bg-secondary/20 rounded-[24px] p-6 md:p-8 mb-10 space-y-6">
        <div className="flex justify-between border-b border-border/50 pb-4">
          <span className="text-muted-foreground">Service</span>
          <span className="font-medium text-right">{bookingState.service || "Elderly Care"}</span>
        </div>
        <div className="flex justify-between border-b border-border/50 pb-4">
          <span className="text-muted-foreground">Caregiver</span>
          <span className="font-medium text-right">{bookingState.caregiverName || "Best Available Match"}</span>
        </div>
        <div className="flex justify-between border-b border-border/50 pb-4">
          <span className="text-muted-foreground">Date & Time</span>
          <span className="font-medium text-right">
            {bookingState.date ? format(bookingState.date, "PPP") : "TBD"} at {bookingState.time}
          </span>
        </div>
        <div className="flex justify-between border-b border-border/50 pb-4">
          <span className="text-muted-foreground">Duration</span>
          <span className="font-medium text-right">{bookingState.duration}</span>
        </div>
        <div className="flex justify-between pb-2">
          <span className="text-muted-foreground">Location</span>
          <span className="font-medium text-right">
            {bookingState.locationType === "Home" 
              ? bookingState.locationDetails.homeAddress 
              : `${bookingState.locationDetails.hospitalName}, Rm ${bookingState.locationDetails.roomNumber}`}
          </span>
        </div>

        <div className="bg-white rounded-xl p-4 mt-6 flex justify-between items-center shadow-sm">
          <span className="font-serif text-xl">Total Estimate</span>
          <span className="font-serif text-2xl text-primary">${basePrice}</span>
        </div>
      </div>

      <div className="flex justify-end border-t border-border/50 pt-6">
        <Button 
          onClick={() => setLocation("/book/payment")} 
          size="lg" 
          className="rounded-full px-10"
        >
          Proceed to Payment
        </Button>
      </div>
    </BookingLayout>
  )
}
