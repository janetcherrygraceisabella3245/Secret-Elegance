import { useState } from "react"
import { useLocation } from "wouter"
import { useBooking } from "@/hooks/BookingContext"
import { BookingLayout } from "@/components/BookingLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function BookLocation() {
    const [, setLocation] = useLocation()
    const { bookingState, updateBookingState } = useBooking()

    const [type, setType] = useState<"Hotel" | "Residence">(bookingState.locationType || "Hotel")
    const [details, setDetails] = useState(bookingState.locationDetails || {})

    const handleNext = () => {
        updateBookingState({ locationType: type, locationDetails: details })
        setLocation("/book/summary")
    }

    const isValid = type === "Hotel"
        ? !!(details.hotelName && details.hotelAddress)
        : !!details.homeAddress

    return (
        <BookingLayout currentStep={6} title="Location">
            <h2 className="text-3xl font-serif text-center mb-8">Where should we meet?</h2>
            <p className="text-muted-foreground text-center mb-8">Choose the location for your private experience</p>

            <div className="flex justify-center gap-4 mb-8">
                <Button
                    variant={type === "Hotel" ? "default" : "outline"}
                    onClick={() => setType("Hotel")}
                    className="w-40 rounded-full"
                >
                    Hotel
                </Button>
                <Button
                    variant={type === "Residence" ? "default" : "outline"}
                    onClick={() => setType("Residence")}
                    className="w-40 rounded-full"
                >
                    Your Residence
                </Button>
            </div>

            <div className="space-y-4 mb-10 max-w-md mx-auto">
                {type === "Hotel" ? (
                    <>
                        <div className="space-y-2">
                            <Label>Hotel Name</Label>
                            <Input
                                value={details.hotelName || ""}
                                onChange={(e) => setDetails({ ...details, hotelName: e.target.value })}
                                placeholder="The Beverly Hills Hotel"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Hotel Address / Room Number</Label>
                            <Input
                                value={details.hotelAddress || ""}
                                onChange={(e) => setDetails({ ...details, hotelAddress: e.target.value })}
                                placeholder="9641 Sunset Blvd, Suite 512"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="space-y-2">
                            <Label>Your Residence Address</Label>
                            <Input
                                value={details.homeAddress || ""}
                                onChange={(e) => setDetails({ ...details, homeAddress: e.target.value })}
                                placeholder="123 Private Drive, Beverly Hills, CA"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Gate Code / Access Instructions (Optional)</Label>
                            <Input
                                value={details.landmark || ""}
                                onChange={(e) => setDetails({ ...details, landmark: e.target.value })}
                                placeholder="Gate code: 4567"
                            />
                        </div>
                    </>
                )}

                <div className="space-y-2 pt-4">
                    <Label>Special Requests / Notes (Optional)</Label>
                    <Textarea
                        value={details.notes || ""}
                        onChange={(e) => setDetails({ ...details, notes: e.target.value })}
                        placeholder="Your phone number, preferred outfit, any specific requests..."
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
                    Continue to Summary
                </Button>
            </div>
        </BookingLayout>
    )
}