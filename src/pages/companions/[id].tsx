import { useLocation } from "wouter"
import { useState } from "react"
import { ArrowLeft, Star, X } from "lucide-react"

// Import all images
import sophia1 from "@/assets/1 (19).jpg"
import sophia2 from "@/assets/1 (16).jpg"
import sophia3 from "@/assets/1 (18).jpg"
import sophia4 from "@/assets/1 (23).jpg"
import sophia5 from "@/assets/1 (22).jpg"

import isabella1 from "@/assets/1 (2).jpg"
import isabella2 from "@/assets/1 (6).jpg"
import isabella3 from "@/assets/1 (3).jpg"
import isabella4 from "@/assets/1 (4).jpg"
import isabella5 from "@/assets/1 (25).jpg"

import luna1 from "@/assets/1 (10).jpg"
import luna2 from "@/assets/1 (9).jpg"
import luna3 from "@/assets/1 (7).jpg"
import luna4 from "@/assets/1 (8).jpg"
import luna5 from "@/assets/1 (14).jpg"

import elena1 from "@/assets/1 (5).jpg"
import elena2 from "@/assets/1 (24).jpg"
import elena3 from "@/assets/1 (26).jpg"
import elena4 from "@/assets/1 (27).jpg"
import elena5 from "@/assets/1 (20).jpg"

const companions = [
    {
        id: 1,
        fullName: "Sophia Laurent",
        age: 24,
        mainImage: sophia1,
        images: [sophia1, sophia2, sophia3, sophia4 ,sophia5],
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
        mainImage: isabella1,
        images: [isabella1, isabella2, isabella3, isabella4 ,isabella5],
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
        mainImage: luna1,
        images: [luna1, luna2, luna3, luna4, luna5],
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
        mainImage: elena1,
        images: [elena1, elena2, elena3, elena4, elena5],
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

    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    if (!girl) return <div className="text-center py-20 text-2xl">Companion not found</div>

    const openLightbox = (src: string) => setSelectedImage(src)
    const closeLightbox = () => setSelectedImage(null)

    const handleBookNow = () => {
        setLocation("/book/date")
    }

    return (
        <div className="min-h-screen bg-white pb-12">
            <div className="max-w-6xl mx-auto px-6 pt-8">
                <button
                    onClick={() => setLocation('/book/Caregiver')}
                    className="flex items-center gap-2 text-gray-500 hover:text-black mb-8"
                >
                    <ArrowLeft className="w-5 h-5" /> Back to Selection
                </button>

                <div className="grid lg:grid-cols-5 gap-10">
                    {/* Image Gallery */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Main Image */}
                        <div
                            className="rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
                            onClick={() => openLightbox(girl.mainImage)}
                        >
                            <img
                                src={girl.mainImage}
                                alt={girl.fullName}
                                className="w-full h-auto max-h-[650px] object-contain bg-black/5"
                            />
                        </div>

                        {/* 4 Thumbnails */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {girl.images.map((img, i) => (
                                <div
                                    key={i}
                                    className="aspect-square rounded-2xl overflow-hidden border border-gray-100 hover:border-rose-300 cursor-pointer transition-all hover:scale-105"
                                    onClick={() => openLightbox(img)}
                                >
                                    <img
                                        src={img}
                                        alt={`${girl.fullName} ${i+1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Details */}
                    <div className="lg:col-span-2 pt-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-5xl font-light font-['Cormorant_Garamond'] text-[#2D3142]">
                                    {girl.fullName}
                                </h1>
                                <p className="text-xl text-gray-500 mt-1">{girl.age} • {girl.location}</p>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-1 text-4xl font-medium">
                                    <Star className="w-8 h-8 fill-amber-400 text-amber-400" /> {girl.rating}
                                </div>
                            </div>
                        </div>

                        <p className="text-3xl font-medium text-[#E8798A] mt-8">${girl.hourlyRate}/hour</p>

                        <div className="mt-10">
                            <h3 className="text-2xl font-medium mb-4">About {girl.fullName.split(' ')[0]}</h3>
                            <p className="text-lg leading-relaxed text-gray-600">
                                {girl.bio} She is known for her warm personality, stunning looks, and ability to make every encounter feel special and passionate.
                            </p>
                        </div>

                        <button
                            onClick={handleBookNow}
                            className="mt-12 w-full bg-[#E8798A] hover:bg-rose-600 text-white py-6 rounded-2xl text-xl font-medium transition-all shadow-lg"
                        >
                            Book {girl.fullName.split(' ')[0]} Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
                    onClick={closeLightbox}
                >
                    <button
                        onClick={closeLightbox}
                        className="absolute top-6 right-6 text-white hover:text-gray-300"
                    >
                        <X className="w-10 h-10" />
                    </button>
                    <img
                        src={selectedImage}
                        alt="Full view"
                        className="max-h-[92vh] max-w-full object-contain"
                        onClick={e => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    )
}