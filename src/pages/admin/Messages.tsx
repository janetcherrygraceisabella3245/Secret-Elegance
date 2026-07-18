import { useState, useRef, useEffect } from "react"
import { useListBookings } from "@/hooks/useBookings"
import { useGetMessages, useSendMessage } from "@/hooks/useMessages"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MessageSquare, Send } from "lucide-react"

export default function AdminMessages() {
  const { data: bookings = [] } = useListBookings()
  const [activeBookingId, setActiveBookingId] = useState<number | null>(null)
  const { data: messages = [] } = useGetMessages(activeBookingId)
  const sendMsg = useSendMessage()
  const [text, setText] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim() || !activeBookingId) return
    await sendMsg.mutateAsync({
      data: { bookingId: activeBookingId, sender: "admin", message: text }
    })
    setText("")
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-serif mb-2">Concierge Messages</h1>
        <p className="text-muted-foreground">Communicate directly with clients regarding their bookings.</p>
      </div>

      <div className="flex-1 bg-white rounded-2xl shadow-sm border overflow-hidden flex">
        {/* Sidebar */}
        <div className="w-80 border-r bg-gray-50/30 overflow-y-auto">
          {bookings.map(b => (
            <div
              key={b.id}
              onClick={() => setActiveBookingId(b.id)}
              className={`p-4 border-b cursor-pointer transition-colors ${
                activeBookingId === b.id
                  ? "bg-primary/5 border-l-4 border-l-primary"
                  : "hover:bg-gray-50 border-l-4 border-l-transparent"
              }`}
            >
              <div className="font-medium text-sm mb-1">{b.clientName}</div>
              <div className="text-xs text-muted-foreground truncate">
                {b.service} — {new Date(b.appointmentDate).toLocaleDateString()}
              </div>
            </div>
          ))}
          {bookings.length === 0 && (
            <div className="p-8 text-center text-sm text-muted-foreground">No active bookings</div>
          )}
        </div>

        {/* Chat Area */}
        {activeBookingId ? (
          <div className="flex-1 flex flex-col bg-slate-50/50">
            <div className="p-4 border-b bg-white">
              <span className="font-medium">
                Booking #{bookings.find(b => b.id === activeBookingId)?.bookingReference ?? activeBookingId} Thread
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[70%] rounded-2xl px-5 py-3 text-sm ${
                      msg.sender === "admin"
                        ? "bg-primary text-white rounded-tr-sm"
                        : "bg-white border rounded-tl-sm shadow-sm"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
              {messages.length === 0 && (
                <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                  No messages yet. Send a greeting to the client.
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="p-4 bg-white border-t">
              <form onSubmit={handleSend} className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={text}
                  onChange={e => setText(e.target.value)}
                  className="rounded-full bg-gray-50"
                />
                <Button type="submit" size="icon" className="rounded-full shrink-0">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground bg-slate-50/50">
            <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
            <p>Select a booking thread to view messages</p>
          </div>
        )}
      </div>
    </div>
  )
}
