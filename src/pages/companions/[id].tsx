import { useLocation } from "wouter"
import { ArrowLeft, Star } from "lucide-react"
import image1 from "@/assets/1 (19).jpg";
import image2 from "@/assets/1 (2).jpg";
import image3 from "@/assets/1 (10).jpg";
import image4 from "@/assets/1 (5).jpg";

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

export default function CompanionProfile() {
    const [location, setLocation] = useLocation()
    const id = parseInt(location.split('/').pop() || '1')
    const girl = companions.find(c => c.id === id)

    if (!girl) return <div>Companion not found</div>

    // Hardcoded extra images per companion (you can replace with real ones)
    const extraImages = [
        girl.image,
        girl.image,
        girl.image,
        girl.image,
    ]

    return (
        <div className="min-h-screen bg-white pb-12">
            <div className="max-w-5xl mx-auto px-6 pt-8">
                <button onClick={() => setLocation('/book/companion')} className="flex items-center gap-2 text-gray-500 hover:text-black mb-8">
                    <ArrowLeft className="w-5 h-5" /> Back to Selection
                </button>

                <div className="grid md:grid-cols-2 gap-10">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-[4/3] rounded-3xl overflow-hidden">
                            <img src={girl.image} alt={girl.fullName} className="w-full h-full object-cover" />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {extraImages.map((img, i) => (
                                <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-gray-100">
                                    <img src={img} alt={`${girl.fullName} ${i+1}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Details */}
                    <div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-5xl font-['Cormorant_Garamond'] font-light">{girl.fullName}</h1>
                                <p className="text-xl text-gray-500 mt-1">{girl.age} • {girl.location}</p>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-1 text-3xl font-medium">
                                    <Star className="w-8 h-8 fill-amber-400 text-amber-400" /> {girl.rating}
                                </div>
                                <p className="text-sm text-gray-400">rating</p>
                            </div>
                        </div>

                        <p className="text-2xl text-[#E8798A] font-medium mt-6">${girl.hourlyRate}/hour</p>

                        <div className="mt-8">
                            <h3 className="text-xl font-medium mb-3">About {girl.fullName.split(' ')[0]}</h3>
                            <p className="text-lg leading-relaxed text-gray-600">{girl.bio} She is known for her warm personality, stunning looks, and ability to make every encounter feel special and passionate.</p>
                        </div>

                        <button
                            onClick={() => {
                                // You can call handleSelect logic here if needed
                                alert(`Booking flow started for ${girl.fullName}`)
                            }}
                            className="mt-10 w-full bg-[#E8798A] hover:bg-rose-600 text-white py-5 rounded-2xl text-lg font-medium transition-all"
                        >
                            Book {girl.fullName.split(' ')[0]} Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}