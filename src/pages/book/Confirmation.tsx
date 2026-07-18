import { Link } from "wouter"
import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BookConfirmation() {
  const ref = sessionStorage.getItem("lastBookingRef") || "REF-DEMO123"

  return (
    <div className="min-h-screen bg-secondary/10 py-20 px-4 flex flex-col items-center justify-center">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-[40px] p-10 md:p-16 shadow-2xl max-w-lg w-full text-center border border-border/50"
      >
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        
        <h1 className="text-4xl font-serif text-foreground mb-4">Payment Successful</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Your booking has been confirmed. Our concierge team will review the details and reach out shortly.
        </p>
        
        <div className="bg-secondary/30 rounded-2xl p-6 mb-10">
          <span className="text-sm text-muted-foreground uppercase tracking-wider mb-2 block">Booking Reference</span>
          <span className="text-2xl font-mono tracking-widest text-primary">{ref}</span>
        </div>

        <div className="flex flex-col gap-4">
          <Button asChild size="lg" className="rounded-full h-14">
            <Link href="/admin/messages">Message Concierge</Link>
          </Button>
          <Button asChild variant="ghost" className="rounded-full">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
