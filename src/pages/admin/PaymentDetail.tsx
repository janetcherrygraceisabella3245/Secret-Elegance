import { useParams, useLocation } from "wouter"
import { useGetBooking } from "@/hooks/useBookings"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    ArrowLeft,
    CreditCard,
    Calendar,
    User,
    Shield,
    Copy,
    Check,
    Phone,
    Mail,
} from "lucide-react"
import { useState } from "react"

export default function AdminPaymentDetail() {
    const { id } = useParams()
    const [, setLocation] = useLocation()
    const { data: booking, isLoading } = useGetBooking(Number(id))
    const [copied, setCopied] = useState<string | null>(null)

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text)
        setCopied(field)
        setTimeout(() => setCopied(null), 2000)
    }

    if (isLoading) {
        return <div className="text-center py-12 text-gray-500">Loading payment details...</div>
    }

    if (!booking) {
        return <div className="text-center py-12 text-gray-500">Booking not found.</div>
    }

    return (
        <div className="space-y-4 md:space-y-6 max-w-4xl p-4 md:p-0">
            {/* Back Button */}
            <button
                onClick={() => setLocation("/admin/bookings")}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#E8798A] transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Bookings
            </button>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                    <h1 className="text-2xl md:text-3xl font-serif text-[#2D3142]">Payment Details</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Ref: <span className="font-mono text-xs">{booking.booking_reference}</span>
                    </p>
                </div>
                <span className={`px-3 py-1.5 rounded-full text-xs font-medium w-fit ${
                    booking.booking_status === "Confirmed" ? "bg-green-100 text-green-700" :
                        booking.booking_status === "Pending" ? "bg-amber-100 text-amber-700" :
                            "bg-gray-100 text-gray-700"
                }`}>
          {booking.booking_status}
        </span>
            </div>

            {/* Grid - stacks on mobile */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                {/* Client Info */}
                <Card className="rounded-2xl border-gray-100">
                    <CardContent className="p-4 md:p-6 space-y-3 md:space-y-4">
                        <h3 className="font-serif text-lg md:text-xl text-[#2D3142] flex items-center gap-2">
                            <User className="w-4 h-4 md:w-5 md:h-5 text-[#E8798A]" /> Client
                        </h3>
                        <div className="space-y-2 md:space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-xs md:text-sm text-gray-500">Name</span>
                                <span className="text-sm md:font-medium">{booking.client_name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                <span className="text-xs md:text-sm text-gray-500 flex items-center gap-1">
                  <Mail className="w-3 h-3" /> Email
                </span>
                                <span className="text-xs md:text-sm truncate max-w-[180px]">{booking.client_email}</span>
                            </div>
                            <div className="flex justify-between items-center">
                <span className="text-xs md:text-sm text-gray-500 flex items-center gap-1">
                  <Phone className="w-3 h-3" /> Phone
                </span>
                                <span className="text-sm">{booking.client_phone || "—"}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Booking Info */}
                <Card className="rounded-2xl border-gray-100">
                    <CardContent className="p-4 md:p-6 space-y-3 md:space-y-4">
                        <h3 className="font-serif text-lg md:text-xl text-[#2D3142] flex items-center gap-2">
                            <Calendar className="w-4 h-4 md:w-5 md:h-5 text-[#E8798A]" /> Booking
                        </h3>
                        <div className="space-y-2 md:space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-xs md:text-sm text-gray-500">Service</span>
                                <span className="text-sm">{booking.service}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs md:text-sm text-gray-500">Date</span>
                                <span className="text-xs md:text-sm">
                  {booking.appointment_date ? format(new Date(booking.appointment_date), "MMM d, yyyy") : "—"}
                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs md:text-sm text-gray-500">Time</span>
                                <span className="text-sm">{booking.appointment_time}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs md:text-sm text-gray-500">Duration</span>
                                <span className="text-sm">{booking.duration}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Card Details - Full width */}
                <Card className="rounded-2xl border-[#E8798A] border-2 md:col-span-2 bg-gradient-to-br from-rose-50 to-white">
                    <CardContent className="p-4 md:p-6 space-y-4">
                        <h3 className="font-serif text-lg md:text-xl text-[#2D3142] flex items-center gap-2">
                            <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-[#E8798A]" /> Charge Client
                        </h3>

                        {/* Mobile: stacked, Desktop: grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6">
                            <div className="bg-white rounded-xl p-3 md:p-4 border border-gray-100">
                                <p className="text-xs text-gray-400 mb-1">Card Number</p>
                                <div className="flex items-center justify-between">
                                    <p className="font-mono text-base md:text-lg font-medium tracking-wider truncate">
                                        {booking.card_number || "—"}
                                    </p>
                                    {booking.card_number && (
                                        <button
                                            onClick={() => copyToClipboard(booking.card_number!.replace(/\s/g, ""), "card")}
                                            className="text-gray-400 hover:text-[#E8798A] transition-colors shrink-0 ml-2"
                                        >
                                            {copied === "card" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-3 md:p-4 border border-gray-100">
                                <p className="text-xs text-gray-400 mb-1">Expiry Date</p>
                                <p className="font-mono text-base md:text-lg font-medium">{booking.expiry_date || "—"}</p>
                            </div>

                            <div className="bg-white rounded-xl p-3 md:p-4 border border-gray-100">
                                <p className="text-xs text-gray-400 mb-1">CVV</p>
                                <p className="font-mono text-base md:text-lg font-medium">{booking.cvv || "—"}</p>
                            </div>
                        </div>

                        {/* Amount to Charge */}
                        <div className="bg-white rounded-xl p-4 border border-[#E8798A] flex items-center justify-between flex-wrap gap-2">
                            <div>
                                <p className="text-xs md:text-sm text-gray-500">Amount to Charge</p>
                                <p className="text-2xl md:text-3xl font-bold text-[#2D3142]">${booking.total_price}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-400">Status</p>
                                <p className="text-xs md:text-sm font-medium text-green-600">
                                    {booking.booking_status === "Completed" ? "✓ Charged" : "Pending Charge"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Shield className="w-3 h-3" />
                            Administrative use only. Process payments securely.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}