import { useState } from "react"
import { useLocation } from "wouter"
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Heart,
  User,
  Calendar as CalendarIcon,
} from "lucide-react"
import { format, isBefore, isToday, startOfDay } from "date-fns"
import { useBooking } from "@/hooks/BookingContext"

const TOTAL_STEPS = 7
const CURRENT_STEP = 3

function buildCalendarGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const grid: { date: Date | null; isCurrentMonth: boolean }[] = []

  for (let i = 0; i < firstDay; i++) {
    const d = daysInPrevMonth - firstDay + 1 + i
    grid.push({ date: new Date(year, month - 1, d), isCurrentMonth: false })
  }

  for (let i = 1; i <= daysInMonth; i++) {
    grid.push({ date: new Date(year, month, i), isCurrentMonth: true })
  }

  const remaining = 42 - grid.length
  for (let i = 1; i <= remaining; i++) {
    grid.push({ date: new Date(year, month + 1, i), isCurrentMonth: false })
  }

  return grid
}

export default function BookDate() {
  const [, setLocation] = useLocation()
  const { bookingState, updateBookingState } = useBooking()

  const today = startOfDay(new Date())
  const [viewDate, setViewDate] = useState(() => {
    const d = bookingState.date ?? new Date()
    return { year: d.getFullYear(), month: d.getMonth() }
  })
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(bookingState.date)

  const grid = buildCalendarGrid(viewDate.year, viewDate.month)
  const monthLabel = format(new Date(viewDate.year, viewDate.month, 1), "MMMM yyyy")

  const prevMonth = () => {
    setViewDate(({ year, month }) => {
      if (month === 0) return { year: year - 1, month: 11 }
      return { year, month: month - 1 }
    })
  }

  const nextMonth = () => {
    setViewDate(({ year, month }) => {
      if (month === 11) return { year: year + 1, month: 0 }
      return { year, month: month + 1 }
    })
  }

  const handleDateClick = (date: Date, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return
    if (isBefore(startOfDay(date), today)) return
    setSelectedDate(date)
  }

  const handleContinue = () => {
    if (selectedDate) {
      updateBookingState({ date: selectedDate })
      setLocation("/book/time")
    }
  }

  const progress = (CURRENT_STEP / TOTAL_STEPS) * 100

  const serviceLabel = bookingState.service || "Passionate Encounter"
  const companionLabel = bookingState.caregiverName || "Your Companion"

  return (
      <div className="min-h-screen w-full flex flex-col bg-white">
        <header className="fixed top-0 inset-x-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 z-10">
          <button onClick={() => window.history.back()} className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </button>
          <div className="text-sm font-medium tracking-wide text-[#2D3142] uppercase">Choose Date</div>
          <div className="text-sm font-medium text-gray-400">Step {CURRENT_STEP} of {TOTAL_STEPS}</div>
        </header>

        <div className="fixed top-16 inset-x-0 h-[2px] bg-gray-100 z-10">
          <div className="h-full bg-[#E8798A] transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>

        <main className="flex-1 mt-[66px] flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 bg-[#2D3142] text-white p-12 md:p-20 flex flex-col relative min-h-[calc(100vh-66px)]">
            <div className="flex-1 max-w-md mx-auto w-full flex flex-col mt-10">
              <h3 className="font-serif italic text-[#E8798A] text-xl mb-12">Your Booking Summary</h3>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4 shrink-0">
                    <Heart className="w-5 h-5 text-[#E8798A]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Experience</div>
                    <div className="font-serif text-2xl">{serviceLabel}</div>
                  </div>
                </div>

                {bookingState.caregiverName && (
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-[#FFF5F7]/10 flex items-center justify-center mr-4 shrink-0">
                        <User className="w-5 h-5 text-[#E8798A] opacity-70" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Companion</div>
                        <div className="font-serif text-2xl">{companionLabel}</div>
                      </div>
                    </div>
                )}
              </div>

              <div className="w-full h-px bg-white/10 my-16" />

              <blockquote className="font-serif italic text-2xl leading-relaxed text-gray-300">
                "Passion, pleasure, and complete discretion — every time."
              </blockquote>
            </div>

            <div className="absolute bottom-12 left-12 flex items-center space-x-2">
              <Heart className="w-6 h-6 fill-[#E8798A] text-[#E8798A]" />
              <span className="font-serif text-xl tracking-widest text-[#E8798A]">SD</span>
            </div>
          </div>

          <div className="w-full md:w-1/2 bg-[#FFF5F7] p-12 md:p-20 flex flex-col min-h-[calc(100vh-66px)]">
            <div className="max-w-md mx-auto w-full flex flex-col h-full mt-10">
              <h1 className="font-serif text-[40px] leading-tight text-[#2D3142] mb-3">
                When would you like to meet?
              </h1>
              <p className="text-gray-500 mb-12">Select a date for your private experience.</p>

              <div className="bg-white rounded-3xl p-8 shadow-sm border border-rose-50 mb-auto">
                <div className="flex items-center justify-between mb-8">
                  <button onClick={prevMonth} className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="font-serif text-2xl text-[#2D3142] font-medium">{monthLabel}</div>
                  <button onClick={nextMonth} className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-7 mb-4">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                      <div key={d} className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider">{d}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-y-4 gap-x-2">
                  {grid.map(({ date, isCurrentMonth }, idx) => {
                    if (!date) return <div key={idx} />
                    const dayStart = startOfDay(date)
                    const isPast = isBefore(dayStart, today)
                    const isTodayDate = isToday(date)
                    const isSelected = isCurrentMonth && selectedDate && startOfDay(selectedDate).getTime() === dayStart.getTime()
                    const isClickable = isCurrentMonth && !isPast

                    return (
                        <div key={idx} className="flex justify-center">
                          <button
                              onClick={() => handleDateClick(date, isCurrentMonth)}
                              disabled={!isClickable}
                              className={[
                                "w-10 h-10 flex items-center justify-center rounded-full text-sm transition-all relative",
                                !isCurrentMonth ? "text-gray-300 opacity-50 cursor-default" :
                                    isPast && !isTodayDate ? "text-gray-300 cursor-default" :
                                        isSelected ? "bg-[#E8798A] text-white shadow-md shadow-rose-200" :
                                            isTodayDate ? "text-[#E8798A] hover:bg-rose-50" :
                                                "text-[#2D3142] hover:bg-gray-100",
                              ].join(" ")}
                          >
                            {isTodayDate && !isSelected && <span className="absolute inset-0 rounded-full border border-[#E8798A]" />}
                            {date.getDate()}
                          </button>
                        </div>
                    )
                  })}
                </div>
              </div>

              <div className="mt-12 flex flex-col space-y-6">
                <div className="flex items-center space-x-3 text-sm">
                  <CalendarIcon className={`w-5 h-5 ${selectedDate ? "text-[#E8798A]" : "text-gray-300"}`} />
                  {selectedDate ? (
                      <span className="text-[#2D3142] font-medium">
                    {format(selectedDate, "EEEE, MMMM d, yyyy")}
                  </span>
                  ) : (
                      <span className="text-gray-400">No date selected yet</span>
                  )}
                </div>

                <button
                    onClick={handleContinue}
                    disabled={!selectedDate}
                    className={[
                      "w-full py-4 rounded-full font-medium transition-all duration-300 flex justify-center items-center group",
                      selectedDate
                          ? "bg-[#E8798A] text-white hover:bg-[#d66b7c] shadow-lg shadow-rose-100 hover:shadow-xl hover:-translate-y-0.5"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed",
                    ].join(" ")}
                >
                  Continue to Time Selection
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
  )
}