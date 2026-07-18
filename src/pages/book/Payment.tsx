import { useState } from "react"
import { useLocation } from "wouter"
import { AlertCircle, Lock } from "lucide-react"
import { useBooking } from "@/hooks/BookingContext"
import { useCreateBooking } from "@/hooks/useBookings"
import { useCreateClient } from "@/hooks/useClients"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"

export default function BookPayment() {
  const [, setLocation] = useLocation()
  const { bookingState, resetBookingState } = useBooking()
  
  const createClient = useCreateClient()
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

  // Format card number with spaces
  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 16) value = value.slice(0, 16)
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value
    setFormData({ ...formData, cardNumber: formatted })
  }

  // Calculate price based on duration for demo
  let basePrice = 45;
  if (bookingState.duration === "Half Day") basePrice = 250;
  if (bookingState.duration === "Full Day") basePrice = 450;
  if (bookingState.duration === "Weekly") basePrice = 3000;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // 1. Create client
      const client = await createClient.mutateAsync({
        data: {
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: bookingState.locationType === "Home" ? bookingState.locationDetails.homeAddress : undefined
        }
      })

      // 2. Create booking
      const bDate = bookingState.date ? format(bookingState.date, "yyyy-MM-dd") : new Date().toISOString().split('T')[0];
      
      const booking = await createBooking.mutateAsync({
        data: {
          clientId: client.id,
          caregiverId: bookingState.caregiverId,
          clientName: formData.name,
          clientEmail: formData.email,
          clientPhone: formData.phone,
          service: bookingState.service || "Elderly Care",
          appointmentDate: bDate,
          appointmentTime: bookingState.time || "09:00 AM",
          duration: bookingState.duration || "Hourly",
          locationType: bookingState.locationType,
          homeAddress: bookingState.locationDetails.homeAddress,
          landmark: bookingState.locationDetails.landmark,
          hospitalName: bookingState.locationDetails.hospitalName,
          hospitalAddress: bookingState.locationDetails.hospitalAddress,
          roomNumber: bookingState.locationDetails.roomNumber,
          notes: bookingState.locationDetails.notes,
          totalPrice: basePrice
        }
      })

      // Store booking ref for success page
      sessionStorage.setItem("lastBookingRef", booking.bookingReference || `REF-${booking.id}`)
      resetBookingState()
      setLocation("/book/confirmation")
    } catch (error) {
      console.error(error)
      alert("Something went wrong processing your booking.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-secondary/10 py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-xl">
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl flex items-start gap-3 mb-8">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-sm">
            <strong className="block mb-1">Educational Prototype</strong>
            This payment form is for demonstration purposes only. Do not enter real payment information. No payments are processed or stored.
          </div>
        </div>

        <div className="bg-white rounded-[32px] p-6 md:p-10 shadow-xl border border-border/50">
          <h2 className="text-3xl font-serif text-center mb-8">Complete Booking</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-serif text-xl border-b pb-2">Your Details</h3>
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Jane Doe" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="jane@example.com" />
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
                <span className="text-primary font-bold">Total: ${basePrice}</span>
              </div>
              
              <div className="space-y-2 relative">
                <Label>Card Number</Label>
                <Input required value={formData.cardNumber} onChange={handleCardChange} placeholder="0000 0000 0000 0000" className="pr-10" />
                <Lock className="absolute right-3 top-9 w-4 h-4 text-muted-foreground" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Expiry Date</Label>
                  <Input required placeholder="MM/YY" value={formData.expiry} onChange={e => setFormData({...formData, expiry: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>CVV</Label>
                  <Input required placeholder="123" maxLength={4} value={formData.cvv} onChange={e => setFormData({...formData, cvv: e.target.value})} />
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading || !formData.name || !formData.email || !formData.cardNumber} 
              className="w-full h-14 rounded-full text-lg mt-8"
            >
              {isLoading ? "Processing..." : `Confirm Booking - $${basePrice}`}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
