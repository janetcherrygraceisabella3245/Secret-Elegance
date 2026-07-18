import { Link } from "wouter"
import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Rates() {
  const plans = [
    {
      name: "Hourly",
      price: "$45",
      period: "per hour",
      desc: "Perfect for temporary assistance, errands, or respite care.",
      features: [
        "Minimum 4-hour booking",
        "Dedicated caregiver match",
        "Basic daily living assistance",
        "Light meal preparation"
      ],
      popular: false
    },
    {
      name: "Half Day",
      price: "$250",
      period: "per 6 hours",
      desc: "Ideal for extended appointments or half-day coverage.",
      features: [
        "Priority caregiver matching",
        "Comprehensive daily assistance",
        "Transportation support",
        "Medication reminders",
        "Detailed daily reporting"
      ],
      popular: true
    },
    {
      name: "Full Day",
      price: "$450",
      period: "per 12 hours",
      desc: "Comprehensive daily support for sustained peace of mind.",
      features: [
        "Elite caregiver selection",
        "Full spectrum daily living support",
        "Complex care capabilities",
        "24/7 Concierge access",
        "Coordination with medical team"
      ],
      popular: false
    }
  ]

  return (
    <div className="w-full flex flex-col pt-10 pb-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-6">Rates & Packages</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transparent, uncompromising quality. Our rates reflect the elite caliber of our professionals and the unhurried nature of our care.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className={`relative h-full ${plan.popular ? 'border-primary shadow-xl scale-105 z-10' : 'border-border/50 shadow-sm'}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center pt-10 pb-6 border-b border-border/50">
                  <CardTitle className="text-xl text-muted-foreground mb-4">{plan.name}</CardTitle>
                  <div className="font-serif text-5xl text-foreground mb-2">{plan.price}</div>
                  <div className="text-sm text-muted-foreground">{plan.period}</div>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-center text-sm text-muted-foreground mb-8 min-h-[40px]">
                    {plan.desc}
                  </p>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-foreground/80">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full rounded-full" 
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link href="/book/service">Book {plan.name}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 bg-secondary/50 rounded-[40px] p-10 text-center max-w-4xl mx-auto">
          <h3 className="font-serif text-2xl mb-4">Need 24/7 or Weekly Care?</h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            We offer bespoke long-term arrangements and live-in care solutions. Contact our concierge to discuss a tailored plan for your loved one.
          </p>
          <Button variant="outline" className="rounded-full bg-white" asChild>
            <Link href="/contact">Contact Concierge</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
