import { Link } from "wouter"
import { motion } from "framer-motion"

export default function About() {
  return (
      <div className="w-full flex flex-col pt-10 pb-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-6">About Us</h1>
            <p className="text-lg text-muted-foreground">
              Redefining premium adult companionship.
            </p>
          </motion.div>

          <div className="prose prose-lg prose-p:text-muted-foreground prose-headings:font-serif mx-auto">
            <h2>Our Story</h2>
            <p>
              We created this platform because we believe every adult deserves access to beautiful, passionate, and genuinely satisfying companionship without complications or judgment. Tired of impersonal apps and uncertain experiences, we built a discreet, high-end service that connects discerning gentlemen with exceptional companions who understand chemistry and pleasure.
            </p>

            <h2>Our Mission</h2>
            <p>
              To deliver sophisticated, passionate companionship experiences that exceed expectations. We focus on mutual attraction, complete discretion, and unforgettable moments tailored to your desires — whether it's a thrilling same-night hookup or a deeply sensual extended encounter.
            </p>

            <h2>The Elite Standard</h2>
            <p>
              We don't just accept anyone. Less than 2% of applicants become companions on our platform. Every woman is carefully vetted for beauty, personality, sophistication, and professionalism. Our companions are chosen because they genuinely enjoy creating intense chemistry and satisfying their clients on every level.
            </p>

            <h2>What Our Companions Satisfy</h2>
            <p>
              Beyond physical attraction, our companions excel at fulfilling fantasies, providing the perfect girlfriend experience (GFE), engaging in meaningful conversation, and delivering passionate, uninhibited encounters. Whether you crave playful seduction, dominant energy, sweet affection, or adventurous exploration — they are here to satisfy your deepest desires with enthusiasm and class.
            </p>
          </div>
        </div>
      </div>
  )
}