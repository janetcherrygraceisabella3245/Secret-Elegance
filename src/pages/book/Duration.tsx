import { useState } from "react"
import { useLocation } from "wouter"
import { useBooking } from "@/hooks/BookingContext"
import { BookingLayout } from "@/components/BookingLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function BookDuration() {
    const [, setLocation] = useLocation()
    const { bookingState, updateBookingState } = useBooking()

    const [duration, setDuration] = useState<string>(bookingState.duration || "")

    const durations = [
        { id: "1hour", title: "1 Hour", desc: "Quick & Passionate" },
        { id: "2hour", title: "2 Hours", desc: "Intimate Session" },
        { id: "Overnight", title: "Overnight", desc: "8–12 hours of pleasure" },
        { id: "FullDay", title: "Full Day", desc: "12+ hours together" },
    ]

    const handleNext = () => {
        if (duration) {
            updateBookingState({ duration })
            setLocation("/book/location")
        }
    }

    return (
        <BookingLayout currentStep={5} title="Duration">
            <h2 className="text-3xl font-serif text-center mb-2">How long do you want to spend together?</h2>
            <p className="text-muted-foreground text-center mb-8">Choose the perfect duration for your experience</p>

            <div className="grid md:grid-cols-2 gap-4 mb-10">
                {durations.map(dur => (
                    <Card
                        key={dur.id}
                        className={`cursor-pointer transition-all ${duration === dur.id ? "ring-2 ring-primary border-transparent bg-primary/5" : "border-border hover:border-primary/50"}`}
                        onClick={() => setDuration(dur.id)}
                    >
                        <CardContent className="p-8 flex flex-col items-center justify-center text-center h-full">
                            <h3 className="font-serif text-2xl font-medium mb-2">{dur.title}</h3>
                            <p className="text-muted-foreground">{dur.desc}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="flex justify-end border-t border-border/50 pt-6">
                <Button
                    onClick={handleNext}
                    disabled={!duration}
                    size="lg"
                    className="rounded-full px-10"
                >
                    Continue
                </Button>
            </div>
        </BookingLayout>
    )
}