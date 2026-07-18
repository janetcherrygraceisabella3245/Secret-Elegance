import { useState } from "react"
import { useLocation } from "wouter"
import { useBooking, BookingState } from "@/hooks/BookingContext"
import { BookingLayout } from "@/components/BookingLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function BookLocation() {
  const [, setLocation] = useLocation()
  const { bookingState, updateBookingState } = useBooking()
  
  const [type, setType] = useState<"Home" | "Hospital">(bookingState.locationType || "Home")
  const [details, setDetails] = useState<BookingState["locationDetails"]>(bookingState.locationDetails || {})

  const handleNext = () => {
    updateBookingState({ locationType: type, locationDetails: details })
    setLocation("/book/summary")
  }

  const isValid = type === "Home" 
    ? !!details.homeAddress 
    : !!(details.hospitalName && details.hospitalAddress)

  return (
    <BookingLayout currentStep={6} title="Location">
      <h2 className="text-3xl font-serif text-center mb-8">Where will the care take place?</h2>

      <div className="flex justify-center gap-4 mb-8">
        <Button 
          variant={type === "Home" ? "default" : "outline"}
          onClick={() => setType("Home")}
          className="w-32 rounded-full"
        >
          Home
        </Button>
        <Button 
          variant={type === "Hospital" ? "default" : "outline"}
          onClick={() => setType("Hospital")}
          className="w-32 rounded-full"
        >
          Hospital
        </Button>
      </div>

      <div className="space-y-4 mb-10 max-w-md mx-auto">
        {type === "Home" ? (
          <>
            <div className="space-y-2">
              <Label>Home Address</Label>
              <Input 
                value={details.homeAddress || ""}
                onChange={(e) => setDetails({ ...details, homeAddress: e.target.value })}
                placeholder="123 Wellness Blvd, Beverly Hills, CA"
              />
            </div>
            <div className="space-y-2">
              <Label>Landmark (Optional)</Label>
              <Input 
                value={details.landmark || ""}
                onChange={(e) => setDetails({ ...details, landmark: e.target.value })}
                placeholder="Near the park"
              />
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <Label>Hospital Name</Label>
              <Input 
                value={details.hospitalName || ""}
                onChange={(e) => setDetails({ ...details, hospitalName: e.target.value })}
                placeholder="Cedars-Sinai Medical Center"
              />
            </div>
            <div className="space-y-2">
              <Label>Hospital Address</Label>
              <Input 
                value={details.hospitalAddress || ""}
                onChange={(e) => setDetails({ ...details, hospitalAddress: e.target.value })}
                placeholder="8700 Beverly Blvd"
              />
            </div>
            <div className="space-y-2">
              <Label>Room Number / Suite</Label>
              <Input 
                value={details.roomNumber || ""}
                onChange={(e) => setDetails({ ...details, roomNumber: e.target.value })}
                placeholder="Suite 402"
              />
            </div>
          </>
        )}

        <div className="space-y-2 pt-4">
          <Label>Special Instructions (Optional)</Label>
          <Textarea 
            value={details.notes || ""}
            onChange={(e) => setDetails({ ...details, notes: e.target.value })}
            placeholder="Gate code, parking instructions, specific requirements..."
          />
        </div>
      </div>

      <div className="flex justify-end border-t border-border/50 pt-6">
        <Button 
          onClick={handleNext} 
          disabled={!isValid}
          size="lg" 
          className="rounded-full px-10"
        >
          Continue
        </Button>
      </div>
    </BookingLayout>
  )
}
