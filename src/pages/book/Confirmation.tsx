import { useLocation } from "wouter"
import { CheckCircle,  Calendar, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Confirmation() {
  const [, setLocation] = useLocation()

  const bookingRef = sessionStorage.getItem("lastBookingRef") || "BOOK-XXXXXX"

  return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-white flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-12">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-5xl font-serif font-light mb-3">Booking Confirmed!</h1>
            <p className="text-xl text-muted-foreground">Your companion has been reserved.</p>
            <p className="text-sm text-muted-foreground mt-2">Reference: <span className="font-mono font-medium">{bookingRef}</span></p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column - Confirmation Details */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border">
              <h3 className="font-serif text-2xl mb-6">Your Booking Details</h3>

              <div className="space-y-5">
                <div className="flex gap-4">
                  <Calendar className="w-5 h-5 text-[#E8798A] mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date & Time</p>
                    <p className="font-medium">Confirmed for your selected date</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <CheckCircle className="w-5 h-5 text-[#E8798A] mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Enjoy Your Experience</p>
                    <p className="font-medium">Discretion and satisfaction guaranteed.</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t text-sm text-muted-foreground">
                Your card will be charged shortly.
              </div>
            </div>

            {/* Right Column - Contact & Next Steps */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border flex flex-col">
              <h3 className="font-serif text-2xl mb-6">Reach out?</h3>

              <div className="space-y-6 flex-1">
                <div>
                  <div className="font-medium mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#E8798A]" /> Admin Support
                  </div>
                  <p className="text-sm">Reach out on imessage and whatsapp</p>
                  <p className="text-sm">+1 (270) 263-2058</p>
                </div>

                <div>
                  <div className="font-medium mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#E8798A]" /> Email Support
                  </div>
                  <p className="text-sm">.</p>
                </div>
              </div>

              <div className="mt-auto pt-6 space-y-3">
                <Button
                    variant="outline"
                    onClick={() => setLocation("/")}
                    className="w-full rounded-full h-12"
                >
                  Return to Homepage
                </Button>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-12">
            Thank you for choosing Secret Desires • All encounters are between consenting adults
          </p>
        </div>
      </div>
  )
}