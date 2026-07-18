import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQ() {
  const faqs = [
    {
      question: "How do you select your companions?",
      answer: "We maintain an exceptionally selective process. Less than 2% of applicants are accepted. Every companion undergoes thorough background checks, identity verification, multiple interviews, and in-person evaluations to ensure they meet our standards for beauty, personality, discretion, and professionalism."
    },
    {
      question: "What is your cancellation policy?",
      answer: "We require 24 hours notice for cancellations. Cancellations made with more than 24 hours notice receive a full refund of the deposit. Last-minute cancellations (under 24 hours) will incur a 50% charge to compensate the companion's time."
    },
    {
      question: "Do you offer incall or outcall services?",
      answer: "Both. Most companions offer outcall (they come to your hotel or residence) and many also provide incall at their private, discreet locations. You can specify your preference when booking."
    },
    {
      question: "Is everything confidential?",
      answer: "Absolute discretion is our top priority. We use secure encrypted platforms, never share your personal information, and all companions are bound by strict confidentiality agreements. Your privacy is guaranteed."
    },
    {
      question: "Are there any rules or boundaries?",
      answer: "All encounters are based on mutual consent and respect. Companions have clear personal boundaries which are communicated upfront. We prioritize safety and comfort for everyone involved."
    },
    {
      question: "How is payment handled?",
      answer: "Payments are securely processed via credit card at the time of booking. For ongoing weekly or monthly care, we can arrange automated recurring billing."
    }
  ]

  return (
    <div className="w-full flex flex-col pt-10 pb-24 bg-white min-h-[calc(100vh-200px)]">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-6">Common Inquiries</h1>
          <p className="text-lg text-muted-foreground">
            Clarity and transparency are the foundations of trust.
          </p>
        </motion.div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
