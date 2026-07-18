import { useLocation } from "wouter"
import { useBooking } from "@/hooks/BookingContext"
import { ArrowLeft, Star, CheckCircle2 } from "lucide-react"
import image1  from "@/assets/1 (19).jpg"
import image2 from "@/assets/1 (2).jpg"
import image3  from "@/assets/1 (10).jpg"
import image4 from "@/assets/1 (5).jpg"


const TOTAL_STEPS = 7
const CURRENT_STEP = 2

const companions = [
    {
        id: 1,
        fullName: "Sophia Laurent",
        age: 24,
        image: image1,
        specialization: "Playful & Passionate",
        rating: 4.9,
        hourlyRate: 300,
        bio: "Stunning brunette with a flirty personality. Loves creating intense chemistry and making every moment exciting.",
        location: "New York",
    },
    {
        id: 2,
        fullName: "Isabella Rossi",
        age: 26,
        image: image2,
        specialization: "Sensual GFE",
        rating: 4.8,
        hourlyRate: 350,
        bio: "Elegant Italian beauty who specializes in passionate overnights and the ultimate girlfriend experience.",
        location: "Miami",
    },
    {
        id: 3,
        fullName: "Luna Valentina",
        age: 23,
        image: image3,
        specialization: "Wild & Adventurous",
        rating: 4.9,
        hourlyRate: 280,
        bio: "Petite, energetic firecracker who brings fun, spontaneity, and zero inhibitions to every encounter.",
        location: "Los Angeles",
    },
    {
        id: 4,
        fullName: "Elena Moreau",
        age: 27,
        image: image4,
        specialization: "Seductive & Sophisticated",
        rating: 4.7,
        hourlyRate: 320,
        bio: "Classy and highly seductive. Perfect for luxury dates and deeply sensual extended experiences.",
        location: "Chicago",
    },
]

export default function BookCompanion() {
  const [, setLocation] = useLocation()
  const { bookingState, updateBookingState } = useBooking()

  const handleSelect = (id: number, name: string) => {
    updateBookingState({ caregiverId: id, caregiverName: name })
    setLocation("/book/date")
  }

  const handleViewProfile = (id: number) => {
    setLocation(`/companions/${id}`)
  }

  const progress = (CURRENT_STEP / TOTAL_STEPS) * 100

  return (
      <div className="min-h-screen w-full flex flex-col bg-[#FFF5F7]">
        {/* Header & Progress Bar (unchanged) */}
        <header className="fixed top-0 inset-x-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 z-10">
          <button onClick={() => window.history.back()} className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </button>
          <div className="text-sm font-medium tracking-wide text-[#2D3142] uppercase">Choose Your Companion</div>
          <div className="text-sm font-medium text-gray-400">Step {CURRENT_STEP} of {TOTAL_STEPS}</div>
        </header>

        <div className="fixed top-16 inset-x-0 h-[2px] bg-gray-100 z-10">
          <div className="h-full bg-[#E8798A] transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>

        <main className="flex-1 mt-[66px] px-6 md:px-16 lg:px-24 py-12">
          <div className="text-center mb-12">
            <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl font-light italic text-[#2D3142] mb-3">
              Meet Our Companions
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Beautiful, passionate, and carefully selected women ready to create unforgettable moments with you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {companions.map((girl) => {
              const isSelected = bookingState.caregiverId === girl.id
              return (
                  <div key={girl.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm border-2 border-transparent hover:border-rose-100 hover:shadow-xl transition-all duration-300">
                    {/* Bigger Image */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-rose-50 cursor-pointer" onClick={() => handleViewProfile(girl.id)}>
                      <img
                          src={girl.image}
                          alt={girl.fullName}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {isSelected && (
                          <div className="absolute top-4 right-4 bg-[#E8798A] text-white rounded-full p-1.5 shadow-lg">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                      )}
                      <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-semibold text-[#2D3142]">{girl.rating}</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#2D3142]">{girl.fullName}</h3>
                        <span className="text-sm text-gray-400">{girl.age} • {girl.location}</span>
                      </div>

                      <p className="text-[#E8798A] font-medium mb-4">{girl.specialization}</p>

                      <div className="text-lg font-medium text-[#2D3142] mb-4">
                        ${girl.hourlyRate}<span className="text-sm font-normal text-gray-400">/hr</span>
                      </div>

                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-6">{girl.bio}</p>

                      <div className="flex gap-3">
                        <button
                            onClick={() => handleViewProfile(girl.id)}
                            className="flex-1 py-3 rounded-2xl border border-[#E8798A] text-[#E8798A] hover:bg-[#E8798A] hover:text-white transition-all"
                        >
                          View Profile
                        </button>
                        <button
                            onClick={() => handleSelect(girl.id, girl.fullName)}
                            className={`flex-1 py-3 rounded-2xl text-sm font-medium transition-all ${isSelected ? "bg-[#E8798A] text-white" : "border border-[#E8798A] text-[#E8798A] hover:bg-[#E8798A] hover:text-white"}`}
                        >
                          {isSelected ? "Selected ✓" : "Book Now"}
                        </button>
                      </div>
                    </div>
                  </div>
              )
            })}
          </div>
        </main>
      </div>
  )
}