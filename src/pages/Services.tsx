import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Link } from "wouter"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import elderlyCareImg from "@/assets/1 (19).jpg"
import homeCareImg from "@/assets/1 (16).jpg"

export default function Services() {
  const services = [
    {
      id: "casual-hookup",
      title: "Casual Dates & Hookups",
      image: elderlyCareImg,
      desc: "Spontaneous, flirty encounters and exciting casual dates with stunning companions who know how to create instant chemistry and unforgettable moments.",
      features: [
        "Charming dinner dates and social outings",
        "Passionate short sessions (1-2 hours)",
        "Flirty conversation and playful energy",
        "Hotel or residence meetups",
        "No-strings-attached excitement"
      ],
      price: "$250/hr"
    },
    {
      id: "passionate-overnight",
      title: "Passionate Overnights & Extended time",
      image: homeCareImg,
      desc: "Deeply sensual overnights and multi-hour experiences filled with intense pleasure, affection, and complete satisfaction with elite companions.",
      features: [
        "Full evening of passion and intimacy",
        "Overnight stays with morning after",
        "Sensual massages and body worship",
        "Fantasy fulfillment and roleplay",
        "24-hour booking options available"
      ],
      price: "$600+"
    }
  ]

  return (
      <div className="w-full flex flex-col pt-10 pb-24">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-6">Our Experiences</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Premium companionship tailored to your desires. Discreet, passionate, and unforgettable adult experiences with verified companions.
            </p>
          </motion.div>

          <div className="flex flex-col gap-16">
            {services.map((svc, idx) => (
                <motion.div
                    key={svc.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.2 }}
                >
                  <Card className="overflow-hidden border-none shadow-xl bg-white">
                    <div className="grid md:grid-cols-2">
                      <div className="aspect-square md:aspect-auto w-full h-full relative">
                        <img src={svc.image} alt={svc.title} className="w-full h-full object-cover absolute inset-0" />
                      </div>
                      <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                        <div className="mb-2">
                      <span className="inline-block px-3 py-1 bg-secondary text-foreground text-xs font-medium rounded-full mb-4">
                        Starts from {svc.price}
                      </span>
                        </div>
                        <h2 className="text-3xl font-serif mb-4">{svc.title}</h2>
                        <p className="text-muted-foreground leading-relaxed mb-8">
                          {svc.desc}
                        </p>
                        <ul className="space-y-3 mb-10">
                          {svc.features.map((feature, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <span className="text-foreground/80">{feature}</span>
                              </li>
                          ))}
                        </ul>
                        <Button asChild size="lg" className="w-fit rounded-full px-8">
                          <Link href="/book/service" className="flex items-center gap-2">
                            Book {svc.title} <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
            ))}
          </div>
        </div>
      </div>
  )
}