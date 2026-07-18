import { BookingProvider, useBooking } from "@/hooks/BookingContext"
// Setup the wizard pages wrapper layout here or just in the routes.
import { Link, useLocation } from "wouter"
import { ChevronLeft } from "lucide-react"

export function BookingLayout({ children, currentStep, title }: { children: React.ReactNode, currentStep: number, title: string }) {
  const totalSteps = 7;
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-secondary/10 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href={currentStep === 1 ? "/" : "#"} onClick={(e) => {
            if (currentStep > 1) {
              e.preventDefault();
              window.history.back();
            }
          }} className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Link>
          <div className="font-serif text-xl">{title}</div>
          <div className="text-sm font-medium text-muted-foreground">Step {currentStep} of {totalSteps}</div>
        </div>

        <div className="w-full h-1 bg-border rounded-full mb-10 overflow-hidden">
          <div className="h-full bg-primary transition-all duration-500 ease-in-out" style={{ width: `${progress}%` }} />
        </div>

        <div className="bg-white rounded-[32px] p-6 md:p-10 shadow-xl border border-border/50">
          {children}
        </div>
      </div>
    </div>
  )
}
