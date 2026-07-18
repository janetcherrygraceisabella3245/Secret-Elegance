import { motion } from "framer-motion"

export default function Privacy() {
  return (
      <div className="w-full flex flex-col pt-10 pb-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-6">Privacy Policy</h1>
          </motion.div>

          <div className="prose prose-p:text-muted-foreground prose-headings:font-serif mx-auto">

            <h2>Information We Collect</h2>
            <p>
              We collect information you provide when you create an account, browse companions, or make a booking. This includes your name, contact details, preferred dates, and any special requests you share with us.
            </p>

            <h2>How We Use Your Information</h2>
            <p>
              Your information is used exclusively to facilitate bookings, match you with suitable companions, process payments, and communicate important details about your appointments. We never sell or share your data with third parties for marketing purposes.
            </p>

            <h2>Data Security & Discretion</h2>
            <p>
              Privacy and confidentiality are our highest priorities. All communications are encrypted, and we use strict security protocols. Your personal information is never shared with the companion until both parties mutually agree to meet. We do not store sensitive payment details on our servers.
            </p>

            <h2>Cookies & Tracking</h2>
            <p>
              We use essential cookies to improve your experience and remember your preferences. You can manage cookie settings through your browser at any time.
            </p>

            <h2>Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal information at any time. For account deletion or data inquiries, please contact us directly.
            </p>

            <h2>Contact Us</h2>
            <p>
              For any questions regarding privacy or data handling, please reach out to our concierge team at <strong>privacy@secretelegance.com</strong>.
            </p>

            <p className="text-sm text-muted-foreground mt-12">
              Last updated: July 2026. We reserve the right to update this policy as needed.
            </p>
          </div>
        </div>
      </div>
  )
}