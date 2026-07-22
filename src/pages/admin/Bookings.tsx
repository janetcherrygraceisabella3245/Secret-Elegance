import { useState } from "react"
import { useLocation } from "wouter"
import { useListBookings, useUpdateBookingStatus } from "@/hooks/useBookings"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
    Search,
    CreditCard,
    CheckCircle,
    XCircle,
    ChevronDown,
    Filter,
} from "lucide-react"

// Companion lookup table — maps caregiver_id to companion info
const COMPANIONS: Record<number, { name: string; specialization: string; rate: number }> = {
    1: { name: "Sophia Laurent", specialization: "Playful & Passionate", rate: 300 },
    2: { name: "Isabella Rossi", specialization: "Sensual GFE", rate: 350 },
    3: { name: "Luna Valentina", specialization: "Wild & Adventurous", rate: 280 },
    4: { name: "Elena Moreau", specialization: "Seductive & Sophisticated", rate: 320 },
}

// Helper to get companion name from caregiver_id
function getCompanionName(caregiverId: number | null): string {
    if (!caregiverId) return "—"
    return COMPANIONS[caregiverId]?.name || `Companion #${caregiverId}`
}

function getCompanionSpecialization(caregiverId: number | null): string {
    if (!caregiverId) return "—"
    return COMPANIONS[caregiverId]?.specialization || "—"
}

export default function AdminBookings() {
    const [, setLocation] = useLocation()
    const { data: bookings = [], isLoading } = useListBookings()
    const updateStatus = useUpdateBookingStatus()
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [expandedId, setExpandedId] = useState<number | null>(null)
    const [showFilters, setShowFilters] = useState(false)

    const filteredBookings = bookings.filter((b) => {
        const companionName = getCompanionName(b.caregiver_id)
        const matchesSearch =
            search === "" ||
            b.client_name?.toLowerCase().includes(search.toLowerCase()) ||
            b.booking_reference?.toLowerCase().includes(search.toLowerCase()) ||
            b.client_email?.toLowerCase().includes(search.toLowerCase()) ||
            companionName.toLowerCase().includes(search.toLowerCase())
        const matchesStatus = statusFilter === "all" || b.booking_status === statusFilter
        return matchesSearch && matchesStatus
    })

    const handleStatusChange = (id: number, status: string) => {
        updateStatus.mutate({ id, status })
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Confirmed":
                return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">{status}</Badge>
            case "Pending":
                return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-xs">{status}</Badge>
            case "Completed":
                return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs">{status}</Badge>
            case "Cancelled":
                return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs">{status}</Badge>
            default:
                return <Badge variant="outline" className="text-xs">{status}</Badge>
        }
    }

    return (
        <div className="space-y-4 md:space-y-6 p-4 md:p-0">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl md:text-3xl font-serif text-[#2D3142]">Bookings</h1>
                    <p className="text-sm text-gray-500 mt-1 hidden md:block">Manage all client bookings</p>
                </div>
            </div>

            {/* Search & Filter Toggle */}
            <div className="flex items-center gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder="Search bookings..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 rounded-xl border-gray-200 h-10 md:h-11 text-sm"
                    />
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="md:hidden rounded-xl h-10 px-3"
                >
                    <Filter className="w-4 h-4" />
                </Button>
            </div>

            {/* Filters */}
            <div className={`${showFilters ? "flex" : "hidden"} md:flex items-center gap-2 overflow-x-auto pb-2`}>
                {["all", "Pending", "Confirmed", "Completed", "Cancelled"].map((status) => (
                    <Button
                        key={status}
                        variant={statusFilter === status ? "default" : "outline"}
                        onClick={() => setStatusFilter(status)}
                        size="sm"
                        className={`rounded-full whitespace-nowrap text-xs md:text-sm ${
                            statusFilter === status ? "bg-[#E8798A] hover:bg-[#d66b7c]" : ""
                        }`}
                    >
                        {status === "all" ? "All" : status}
                    </Button>
                ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                {[
                    { label: "Total", value: bookings.length, color: "bg-gray-100 text-gray-700" },
                    { label: "Pending", value: bookings.filter(b => b.booking_status === "Pending").length, color: "bg-amber-100 text-amber-700" },
                    { label: "Confirmed", value: bookings.filter(b => b.booking_status === "Confirmed").length, color: "bg-green-100 text-green-700" },
                    { label: "Completed", value: bookings.filter(b => b.booking_status === "Completed").length, color: "bg-blue-100 text-blue-700" },
                ].map((stat) => (
                    <div key={stat.label} className={`${stat.color} rounded-xl md:rounded-2xl p-3 md:p-5`}>
                        <p className="text-xs md:text-sm font-medium">{stat.label}</p>
                        <p className="text-xl md:text-3xl font-bold mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Content */}
            {isLoading ? (
                <div className="text-center py-12 text-gray-500">Loading bookings...</div>
            ) : filteredBookings.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    {search ? "No bookings match your search." : "No bookings yet."}
                </div>
            ) : (
                <>
                    {/* Desktop Table */}
                    <div className="hidden md:block bg-white rounded-2xl border overflow-hidden">
                        <table className="w-full">
                            <thead>
                            <tr className="bg-gray-50/50 text-left">
                                <th className="font-medium text-sm p-4">Reference</th>
                                <th className="font-medium text-sm p-4">Client</th>
                                <th className="font-medium text-sm p-4">Companion</th>
                                <th className="font-medium text-sm p-4">Date & Time</th>
                                <th className="font-medium text-sm p-4">Duration</th>
                                <th className="font-medium text-sm p-4">Location</th>
                                <th className="font-medium text-sm p-4">Status</th>
                                <th className="font-medium text-sm p-4 text-right">Total</th>
                                <th className="font-medium text-sm p-4">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredBookings.map((booking) => {
                                const companionName = getCompanionName(booking.caregiver_id)
                                const companionSpec = getCompanionSpecialization(booking.caregiver_id)

                                return (
                                    <tr key={booking.id} className="border-t hover:bg-gray-50/50">
                                        <td className="p-4 font-mono text-xs">{booking.booking_reference}</td>
                                        <td className="p-4">
                                            <p className="font-medium text-sm">{booking.client_name}</p>
                                            <p className="text-xs text-gray-400">{booking.client_email}</p>
                                        </td>
                                        <td className="p-4">
                                            <p className="font-medium text-sm">{companionName}</p>
                                            <p className="text-xs text-gray-400">{companionSpec}</p>
                                            <p className="text-xs text-gray-300">ID: {booking.caregiver_id || "—"}</p>
                                        </td>
                                        <td className="p-4 text-sm">
                                            {booking.appointment_date ? format(new Date(booking.appointment_date), "MMM d, yyyy") : "—"}
                                            <br />
                                            <span className="text-xs text-gray-400">{booking.appointment_time}</span>
                                        </td>
                                        <td className="p-4 text-sm">{booking.duration}</td>
                                        <td className="p-4 text-sm max-w-[150px] truncate">
                                            {booking.location_type === "Hotel" ? `🏨 ${booking.hotel_name}` : `🏠 ${booking.home_address}`}
                                        </td>
                                        <td className="p-4">{getStatusBadge(booking.booking_status)}</td>
                                        <td className="p-4 text-right font-medium">${booking.total_price}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1">
                                                {booking.booking_status === "Pending" && (
                                                    <>
                                                        <Button size="sm" variant="ghost" onClick={() => handleStatusChange(booking.id, "Confirmed")}
                                                                className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50">
                                                            <CheckCircle className="w-4 h-4" />
                                                        </Button>
                                                        <Button size="sm" variant="ghost" onClick={() => handleStatusChange(booking.id, "Cancelled")}
                                                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50">
                                                            <XCircle className="w-4 h-4" />
                                                        </Button>
                                                    </>
                                                )}
                                                {booking.booking_status === "Confirmed" && (
                                                    <Button size="sm" variant="ghost" onClick={() => handleStatusChange(booking.id, "Completed")}
                                                            className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                        <CheckCircle className="w-4 h-4" />
                                                    </Button>
                                                )}
                                                <Button size="sm" variant="ghost" onClick={() => setLocation(`/admin/payment/${booking.id}`)}
                                                        className="h-8 w-8 p-0 text-[#E8798A] hover:text-[#d66b7c] hover:bg-rose-50">
                                                    <CreditCard className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-3">
                        {filteredBookings.map((booking) => {
                            const companionName = getCompanionName(booking.caregiver_id)
                            const companionSpec = getCompanionSpecialization(booking.caregiver_id)

                            return (
                                <div
                                    key={booking.id}
                                    className="bg-white rounded-xl border p-4 space-y-3"
                                    onClick={() => setExpandedId(expandedId === booking.id ? null : booking.id)}
                                >
                                    {/* Top Row */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            {getStatusBadge(booking.booking_status)}
                                            <span className="font-mono text-xs text-gray-400">{booking.booking_reference}</span>
                                        </div>
                                        <span className="font-bold text-sm">${booking.total_price}</span>
                                    </div>

                                    {/* Client Info */}
                                    <div>
                                        <p className="font-medium text-sm">{booking.client_name}</p>
                                        <p className="text-xs text-gray-400">{booking.client_email}</p>
                                    </div>

                                    {/* Companion & Summary */}
                                    <div className="flex items-center gap-3 text-xs text-gray-500">
                                        <span className="font-medium text-[#E8798A]">{companionName}</span>
                                        <span>•</span>
                                        <span>{booking.appointment_date ? format(new Date(booking.appointment_date), "MMM d") : "—"}</span>
                                        <span>•</span>
                                        <span>{booking.appointment_time}</span>
                                    </div>

                                    {/* Expanded Details */}
                                    {expandedId === booking.id && (
                                        <div className="pt-3 border-t space-y-3 animate-in slide-in-from-top-2">
                                            <div className="grid grid-cols-2 gap-2 text-xs">
                                                <div>
                                                    <p className="text-gray-400">Companion</p>
                                                    <p className="font-medium">{companionName}</p>
                                                    <p className="text-gray-400 text-[10px]">{companionSpec}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-400">Service</p>
                                                    <p className="font-medium">{booking.service}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-400">Duration</p>
                                                    <p className="font-medium">{booking.duration}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-400">Caregiver ID</p>
                                                    <p className="font-medium">{booking.caregiver_id || "—"}</p>
                                                </div>
                                                <div className="col-span-2">
                                                    <p className="text-gray-400">Location</p>
                                                    <p className="font-medium truncate">
                                                        {booking.location_type === "Hotel" ? booking.hotel_name : booking.home_address}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-2 pt-2">
                                                {booking.booking_status === "Pending" && (
                                                    <>
                                                        <Button size="sm" onClick={() => handleStatusChange(booking.id, "Confirmed")}
                                                                className="h-8 text-xs rounded-lg bg-green-500 hover:bg-green-600 text-white">
                                                            Confirm
                                                        </Button>
                                                        <Button size="sm" variant="outline" onClick={() => handleStatusChange(booking.id, "Cancelled")}
                                                                className="h-8 text-xs rounded-lg border-red-200 text-red-600">
                                                            Cancel
                                                        </Button>
                                                    </>
                                                )}
                                                {booking.booking_status === "Confirmed" && (
                                                    <Button size="sm" onClick={() => handleStatusChange(booking.id, "Completed")}
                                                            className="h-8 text-xs rounded-lg bg-blue-500 hover:bg-blue-600 text-white">
                                                        Complete
                                                    </Button>
                                                )}
                                                <Button size="sm" variant="outline"
                                                        onClick={(e) => { e.stopPropagation(); setLocation(`/admin/payment/${booking.id}`) }}
                                                        className="h-8 text-xs rounded-lg border-[#E8798A] text-[#E8798A] ml-auto">
                                                    <CreditCard className="w-3 h-3 mr-1" /> Charge
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex justify-center">
                                        <ChevronDown className={`w-4 h-4 text-gray-300 transition-transform ${expandedId === booking.id ? "rotate-180" : ""}`} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </>
            )}
        </div>
    )
}