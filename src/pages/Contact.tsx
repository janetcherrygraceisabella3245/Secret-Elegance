import { motion } from "framer-motion"
import { Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function Contact() {
  return (
      <div className="w-full flex flex-col pt-10 pb-24 bg-secondary/10">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-6">Contact Concierge</h1>
            <p className="text-lg text-muted-foreground">
              Our discreet booking team is available 24/7 to help you find the perfect companion.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-serif mb-8">Get in Touch</h2>
              <div className="space-y-8 mb-12">

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Via imessage and whatsapp</h4>
                    <p className="text-muted-foreground text-sm">+1 (270) 263-2058</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Email</h4>
                    <p className="text-muted-foreground text-sm">info@secretelegance.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-xl border border-border/50">
              <h3 className="font-serif text-2xl mb-6">Send a Message</h3>
              <form className="space-y-6" onSubmit={e => { e.preventDefault(); alert('Message sent!'); }}>
                <div className="space-y-2">
                  <Label>Your Name</Label>
                  <Input placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input type="email" placeholder="john@exmaple.com" />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input type="tel" placeholder="+1 (555) 000-0000" />
                </div>
                <div className="space-y-2">
                  <Label>How can we help you?</Label>
                  <Textarea placeholder="Tell us your desires, preferred date, city, or any special requests..." className="min-h-[120px]" />
                </div>
                <Button className="w-full h-12 rounded-full mt-4" type="submit">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
  )
}