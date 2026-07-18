import { Link, useLocation } from "wouter"
import { Heart, Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  const [location] = useLocation()

  // Only render on non-admin routes
  if (location.startsWith("/admin") || location.startsWith("/book/")) return null;

  return (
      <footer className="bg-white border-t border-border pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-6 group">
                <div className="bg-primary/10 p-2 rounded-xl text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Heart className="w-5 h-5" />
                </div>
                <span className="font-serif text-2xl font-medium tracking-tight text-foreground">
                Secret Elegance
              </span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Premium discreet companionship for discerning gentlemen. We connect you with beautiful, passionate, and highly professional companions for unforgettable experiences.
              </p>
            </div>

            <div>
              <h4 className="font-serif text-lg font-medium mb-6">Experiences</h4>
              <ul className="space-y-4">
                <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">Casual Hookups</Link></li>
                <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">Passionate Overnights</Link></li>
                <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">Dinner Dates</Link></li>
                <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">Extended Encounters</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-lg font-medium mb-6">Company</h4>
              <ul className="space-y-4">
                <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">About Us</Link></li>
                <li><Link href="/companions" className="text-muted-foreground hover:text-primary transition-colors text-sm">Our Companions</Link></li>
                <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">Our Services</Link></li>
                <li><Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors text-sm">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-lg font-medium mb-6">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-muted-foreground text-sm">123 Private Drive, Luxury District, Beverly Hills, CA 90210</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-muted-foreground text-sm">+1 (800) 555-DESIRE</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-muted-foreground text-sm">info@secretelegance.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()}Secret Elegance   . All rights reserved. For adults 18+ only.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">Privacy Policy</Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
  )
}