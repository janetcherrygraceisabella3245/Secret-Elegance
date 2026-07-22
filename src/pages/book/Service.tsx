import { useLocation } from "wouter"
import { useBooking } from "@/hooks/BookingContext"
import { BookingLayout } from "@/components/BookingLayout"
import { Card, CardContent } from "@/components/ui/card"
import image1 from "@/assets/1 (19).jpg"
import image2 from "@/assets/1 (20).jpg"

export default function BookService() {
  const [, setLocation] = useLocation()
  const { bookingState, updateBookingState } = useBooking()

  const handleSelect = (service: string) => {
    updateBookingState({ service })
    setLocation("/book/companion")
  }

  return (
      <BookingLayout currentStep={1} title="Select Experience">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-serif font-bold tracking-tight mb-4">
            What are you craving today?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the experience that matches your desire
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card
              className={`cursor-pointer overflow-hidden transition-all hover:shadow-2xl group ${bookingState.service === "Casual Hookup" ? "ring-2 ring-primary border-primary" : "border-border"}`}
              onClick={() => handleSelect("Casual Hookup")}
          >
            <div className="relative h-[380px] md:h-[460px] overflow-hidden">
              <img src={image1} alt="Casual Hookup" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="font-serif text-4xl font-bold mb-1">Casual Hookup</h3>
              </div>
            </div>
            <CardContent className="p-6 text-center">
              <p className="text-lg text-muted-foreground">
                Spontaneous, flirty, and passionate short sessions with instant chemistry.
              </p>
            </CardContent>
          </Card>

          <Card
              className={`cursor-pointer overflow-hidden transition-all hover:shadow-2xl group ${bookingState.service === "Passionate Overnight" ? "ring-2 ring-primary border-primary" : "border-border"}`}
              onClick={() => handleSelect("Passionate Overnight")}
          >
            <div className="relative h-[380px] md:h-[460px] overflow-hidden">
              <img src={image2} alt="Passionate Overnight" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="font-serif text-4xl font-bold mb-1">Passionate Overnight</h3>
              </div>
            </div>
            <CardContent className="p-6 text-center">
              <p className="text-lg text-muted-foreground">
                Intense, sensual full nights filled with pleasure and connection.
              </p>
            </CardContent>
          </Card>
        </div>
      </BookingLayout>
  )
}