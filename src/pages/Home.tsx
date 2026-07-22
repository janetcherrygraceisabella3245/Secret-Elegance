import { motion } from "framer-motion"
import { Link } from "wouter"
import { ArrowRight, ShieldCheck, HeartPulse, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import elderlyCareImg from "@/assets/1 (19).jpg"
import homeCareImg from "@/assets/1 (16).jpg"

export default function Home() {

  return (
      <div className="flex flex-col w-full min-h-screen">
        {/* Hero Section */}
        <section className="relative w-full overflow-hidden bg-secondary/30 pt-20 pb-32">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4 md:px-8 text-center max-w-4xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Badge variant="outline" className="mb-6 px-4 py-1.5 border-primary/20 bg-primary/5 text-primary rounded-full">
                Premium Private Companionship
              </Badge>
              <h1 className="text-5xl md:text-7xl font-serif text-foreground leading-tight tracking-tight mb-6">
                Sophisticated connections <br/>
                <span className="italic text-primary">for adults who know what they want.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
                Discreet, passionate hookups and companionship tailored to your desires. Verified companions, complete privacy, and unforgettable experiences in the comfort of your chosen setting.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/book/service" className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 w-full sm:w-auto shadow-md">
                  Book a Companion
                </Link>
                <Link href="/services" className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-medium transition-colors bg-white text-foreground border border-border hover:bg-muted h-14 px-8 w-full sm:w-auto shadow-sm">
                  Explore Experiences
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">Our Experiences</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Curated companionship experiences designed for your pleasure and satisfaction.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.1 }}>
                <Card className="h-full border-none shadow-lg overflow-hidden group">
                  <div className="aspect-[2.5/3] w-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                    <img src={elderlyCareImg} alt="Casual Companionship" className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-700" />
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-serif mb-3">Casual Dates & Hookups</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      Spontaneous, flirty encounters and charming dates that ignite chemistry. Perfect for when you want excitement without complications.
                    </p>
                    <Link href="/book/service" className="text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all">
                      Book a Hookup <ArrowRight className="w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                <Card className="h-full border-none shadow-lg overflow-hidden group">
                  <div className="aspect-[2.5/3] w-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                    <img src={homeCareImg} alt="Intimate Companionship" className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-700" />
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-serif mb-3">Passionate Overnights</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      Deeply sensual evenings and full nights of uninhibited pleasure with stunning, attentive companions who know exactly how to satisfy.
                    </p>
                    <Link href="/book/service" className="text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all">
                      Book Overnight <ArrowRight className="w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 bg-secondary/50">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-6">The art of unforgettable pleasure.</h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  We connect you with elite, verified companions who deliver chemistry, passion, and discretion. Every encounter is crafted for mutual satisfaction and complete privacy.
                </p>

                <div className="space-y-6">
                  {[
                    { icon: ShieldCheck, title: "Verified & Vetted", desc: "Every companion is thoroughly screened. Only the most attractive and professional are accepted." },
                    { icon: Clock, title: "Unrushed Passion", desc: "Time is yours. Our companions give you their full, undivided attention — no clock-watching." },
                    { icon: HeartPulse, title: "Chemistry First", desc: "Genuine attraction and mutual desire are essential. We prioritize real connection." }
                  ].map((feature, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="bg-white shadow-sm p-3 rounded-xl h-fit text-primary">
                          <feature.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-serif text-xl font-medium mb-1">{feature.title}</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                      </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 rounded-[40px] -rotate-3 scale-105"></div>
                <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-xl relative z-10">
                  <h3 className="font-serif text-2xl mb-8 text-center">How Booking Works</h3>

                  <div className="space-y-8">
                    {[
                      { step: "01", title: "Choose Your Companion", desc: "Browse stunning profiles and pick who excites you." },
                      { step: "02", title: "Tell Us Your Desires", desc: "Share your fantasy, duration, and any special requests." },
                      { step: "03", title: "Schedule Discreetly", desc: "Select date, time, and location (incall or outcall)." },
                      { step: "04", title: "Meet & Enjoy", desc: "Connect in complete privacy and indulge." }
                    ].map((step, idx) => (
                        <div key={idx} className="flex items-start gap-4">
                          <div className="text-primary font-serif italic text-2xl font-bold">{step.step}</div>
                          <div className="pt-1">
                            <h4 className="font-medium text-foreground">{step.title}</h4>
                            <p className="text-sm text-muted-foreground">{step.desc}</p>
                          </div>
                        </div>
                    ))}
                  </div>

                  <Button className="w-full mt-10 rounded-full h-12" asChild>
                    <Link href="/book/service">Start Booking Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-24 bg-primary text-primary-foreground text-center px-4">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Ready for an unforgettable night?</h2>
            <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto">
              Browse our exclusive companions and book your private experience. Discreet, secure, and available tonight.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/book/service" className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-medium transition-colors bg-white text-primary hover:bg-white/90 h-14 px-10 shadow-lg">
                Book Your Companion
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-medium transition-colors border border-white/30 hover:bg-white/10 h-14 px-10">
                Browse Profiles
              </Link>
            </div>
          </div>
        </section>
      </div>
  )
}