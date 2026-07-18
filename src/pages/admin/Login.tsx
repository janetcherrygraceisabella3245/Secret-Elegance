import { useState } from "react"
import { useLocation } from "wouter"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock } from "lucide-react"

export default function AdminLogin() {
  const [, setLocation] = useLocation()
  const [pin, setPin] = useState("")
  const [error, setError] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (pin === "admin123") {
      localStorage.setItem("admin_auth", "true")
      setLocation("/admin/dashboard")
    } else {
      setError(true)
      setPin("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-10 w-full max-w-sm shadow-xl border text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-serif mb-2">Admin Access</h1>
        <p className="text-muted-foreground text-sm mb-8">Enter PIN to access the console</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <Input 
            type="password" 
            placeholder="Enter PIN (admin123)" 
            value={pin}
            onChange={(e) => {
              setPin(e.target.value)
              setError(false)
            }}
            className={`text-center text-xl h-14 tracking-widest ${error ? "border-destructive ring-destructive" : ""}`}
          />
          {error && <p className="text-destructive text-sm">Incorrect PIN</p>}
          <Button type="submit" className="w-full h-14 rounded-full text-lg">
            Verify Access
          </Button>
        </form>
      </div>
    </div>
  )
}
