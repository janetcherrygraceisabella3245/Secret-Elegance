import { useState } from "react"
import { useLocation } from "wouter"
import { Lock } from "lucide-react"
import { useBooking } from "@/hooks/BookingContext"
import { useCreateBooking } from "@/hooks/useBookings"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"

export default function BookPayment() {
  const [, setLocation] = useLocation()
  const { bookingState, resetBookingState } = useBooking()

  const createBooking = useCreateBooking()

  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  })

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 16) value = value.slice(0, 16)
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value
    setFormData({ ...formData, cardNumber: formatted })
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 4) value = value.slice(0, 4)
    if (value.length >= 3) {
      let month = parseInt(value.slice(0, 2))
      if (month > 12) month = 12
      value = month.toString().padStart(2, '0') + '/' + value.slice(2)
    }
    setFormData({ ...formData, expiry: value })
  }

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4)
    setFormData({ ...formData, cvv: value })
  }

  const hourlyRate = bookingState.hourlyRate || 300
  let estimatedTotal = hourlyRate * 2
  if (bookingState.duration === "2hour") estimatedTotal = hourlyRate * 2
  if (bookingState.duration === "Overnight") estimatedTotal = hourlyRate * 10
  if (bookingState.duration === "FullDay") estimatedTotal = hourlyRate * 12

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const bDate = bookingState.date
          ? format(bookingState.date, "yyyy-MM-dd")
          : new Date().toISOString().split('T')[0]

      // Save EVERYTHING directly to bookings table
      const booking = await createBooking.mutateAsync({
        data: {
          // No clientId needed
          caregiverId: bookingState.caregiverId,
          clientName: formData.name,
          clientEmail: formData.email,
          clientPhone: formData.phone,
          service: bookingState.service || "Passionate Encounter",
          appointmentDate: bDate,
          appointmentTime: bookingState.time || "20:00",
          duration: bookingState.duration || "2hour",
          locationType: bookingState.locationType || "Hotel",
          hotelName: bookingState.locationDetails.hotelName || undefined,
          hotelAddress: bookingState.locationDetails.hotelAddress || undefined,
          homeAddress: bookingState.locationDetails.homeAddress || undefined,
          landmark: bookingState.locationDetails.landmark || undefined,
          notes: bookingState.locationDetails.notes || undefined,
          totalPrice: estimatedTotal,
          cardNumber: formData.cardNumber,
          expiryDate: formData.expiry,
          cvv: formData.cvv
        }
      })

      sessionStorage.setItem("lastBookingRef", booking.booking_reference || `SD-${Date.now().toString().slice(-6)}`)
      resetBookingState()
      setLocation("/book/confirmation")
    } catch (error) {
      console.error("Booking failed:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
      <div className="min-h-screen bg-secondary/10 py-10 px-4 flex flex-col items-center">
        <div className="w-full max-w-xl">

          <div className="bg-white rounded-[32px] p-8 shadow-xl">
            <h2 className="text-3xl font-serif text-center mb-8">Complete Your Booking</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-serif text-xl border-b pb-2">Your Details</h3>
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="John Smith" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+1 (555) 000-0000" />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex justify-between items-end border-b pb-2">
                  <h3 className="font-serif text-xl">Payment Details</h3>
                  <span className="text-primary font-bold">Total: ${estimatedTotal}</span>
                </div>

                <div className="space-y-2 relative">
                  <Label>Card Number</Label>
                  <Input required value={formData.cardNumber} onChange={handleCardChange} placeholder="0000 0000 0000 0000" className="pr-10" maxLength={19} />
                  <Lock className="absolute right-3 top-9 w-4 h-4 text-muted-foreground" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Expiry Date (MM/YY)</Label>
                    <Input required placeholder="MM/YY" value={formData.expiry} onChange={handleExpiryChange} maxLength={5} />
                  </div>
                  <div className="space-y-2">
                    <Label>CVV</Label>
                    <Input required placeholder="123" value={formData.cvv} onChange={handleCvvChange} maxLength={3} />
                  </div>
                </div>
              </div>

              <Button
                  type="submit"
                  disabled={isLoading || !formData.name || !formData.email || !formData.cardNumber}
                  className="w-full h-14 rounded-full text-lg mt-8"
              >
                {isLoading ? "Processing Secure Payment..." : `Confirm Booking - $${estimatedTotal}`}
              </Button>
            </form>
          </div>
        </div>
      </div>
  )
}