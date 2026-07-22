import { useState } from "react"
import { useLocation } from "wouter"
import { useBooking } from "@/hooks/BookingContext"
import { BookingLayout } from "@/components/BookingLayout"
import { Button } from "@/components/ui/button"

export default function BookTime() {
    const [, setLocation] = useLocation()
    const { bookingState, updateBookingState } = useBooking()

    const [time, setTime] = useState<string>(bookingState.time || "")

    const timeSlots = [
        "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM",
        "12:00 AM", "01:00 AM", "02:00 AM", "03:00 AM",
        "04:00 AM", "05:00 AM", "06:00 AM", "07:00 AM"
    ]

    const handleNext = () => {
        if (time) {
            updateBookingState({ time })
            setLocation("/book/duration")
        }
    }

    return (
        <BookingLayout currentStep={4} title="Choose Time">
            <h2 className="text-3xl font-serif text-center mb-2">What time should she arrive?</h2>
            <p className="text-muted-foreground text-center mb-8">Select your preferred start time for the encounter</p>

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