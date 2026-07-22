import * as React from "react"
import { motion } from "framer-motion"
import { Link } from "wouter"
import { Search, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import image1  from "@/assets/1 (19).jpg"
import image2 from "@/assets/1 (2).jpg"
import image3  from "@/assets/1 (10).jpg"
import image4 from "@/assets/1 (5).jpg"

export default function Companions() {
  const [search, setSearch] = React.useState("")

  const girls = [
    {
      id: 1,
      fullName: "Sophia Laurent",
      age: 24,
      image: image1,
      specialization: "Passionate & Playful",
      rating: 4.9,
      hourlyRate: 300,
      availability: "Available Tonight",
      bio: "Stunning brunette with an irresistible smile. Loves deep conversation, teasing, and creating intense chemistry.",
      location: "NYC"
    },
    {
      id: 2,
      fullName: "Isabella Rossi",
      age: 26,
      image: image2,
      specialization: "Sensual & Elegant",
      rating: 4.8,
      hourlyRate: 350,
      availability: "Available Now",
      bio: "Italian beauty who specializes in passionate overnights and unforgettable GFE experiences.",
      location: "Miami"
    },
    {
      id: 3,
      fullName: "Luna Valentina",
      age: 23,
      image: image3,
      specialization: "Wild & Adventurous",
      rating: 4.9,
      hourlyRate: 280,
      availability: "Available Today",
      bio: "Petite firecracker who brings energy, spontaneity, and zero inhibitions to every encounter.",
      location: "LA"
    },
    {
      id: 4,
      fullName: "Elena Moreau",
      age: 27,
      image: image4,
      specialization: "Seductive & Sophisticated",
      rating: 4.7,
      hourlyRate: 320,
      availability: "Available Tonight",
      bio: "Classy French-American who excels at luxury dates and deeply sensual extended sessions.",
      location: "Chicago"
    }
  ]

  const filtered = girls.filter(g =>
      g.fullName.toLowerCase().includes(search.toLowerCase()) ||
      g.specialization.toLowerCase().includes(search.toLowerCase())
  )

  return (
      <div className="w-full flex flex-col pt-10 pb-24 bg-secondary/20 min-h-screen">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-6">Our Companions</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Meet our exclusive, verified companions. All profiles are hand-selected for beauty, personality, and professionalism.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1.5/1-translate-y-1/1.5 text-muted-foreground w-5 h-5" />
                <Input
                    placeholder="Search by name or style..."
                    className="pl-12 h-14 rounded-full bg-white border-none shadow-sm"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((girl, idx) => (
                <motion.div
                    key={girl.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                >
                  <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden bg-white">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                            src={girl.image}
                            alt={girl.fullName}
                            className="w-full h-full object-cover"
                        />
                        <Badge
                            variant="outline"
                            className="absolute top-4 right-4 bg-green-50 text-green-700 border-green-200"
                        >
                          {girl.availability}
                        </Badge>
                      </div>

                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-serif text-2xl font-medium text-foreground group-hover:text-primary transition-colors">
                              {girl.fullName}
                            </h3>
                            <p className="text-sm text-muted-foreground">{girl.age} </p>
                          </div>
                          <div className="flex items-center gap-1 text-amber-500">
                            <Star className="w-5 h-5 fill-current" />
                            <span className="font-medium text-foreground">{girl.rating}</span>
                          </div>
                        </div>

                        <p className="text-primary font-medium mb-3">{girl.specialization}</p>

                        <p className="text-sm text-muted-foreground line-clamp-3 mb-6 leading-relaxed">
                          {girl.bio}
                        </p>

                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-border">
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">Starting at</span>
                            <span className="text-lg font-serif font-medium">${girl.hourlyRate}/hr</span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="rounded-full" asChild>
                              <Link href={`/book/service?companionId=${girl.id}`}>Book Now</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
            ))}
          </div>
        </div>
      </div>
  )
}