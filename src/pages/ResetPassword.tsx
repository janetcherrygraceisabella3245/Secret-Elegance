import { useState } from "react"
import { useLocation } from "wouter"
import { Heart, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/AuthContext"
import { useToast } from "@/hooks/use-toast"

export default function ResetPassword() {
    const [, setLocation] = useLocation()
    const { updatePassword } = useAuth()
    const { toast } = useToast()
    const [password, setPassword] = useState("")
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (password.length < 8) {
            toast({ title: "Password too short", variant: "destructive" })
            return
        }
        setLoading(true)
        try {
            await updatePassword(password)
            toast({ title: "Password updated", description: "You can now sign in." })
            setLocation("/")
        } catch (err: any) {
            toast({ title: "Failed", description: err.message, variant: "destructive" })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-rose-50 px-6">
            <div className="w-full max-w-md">
                <div className="flex items-center gap-2 mb-8">
                    <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
                    <span className="text-xl font-serif text-slate-800">Secret Elegance</span>
                </div>

                <h1 className="text-3xl font-serif text-slate-800 mb-2">Set new password</h1>
                <p className="text-slate-500 mb-8">Choose a strong password for your account.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-slate-700">New password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                                id="password"
                                type={show ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10 pr-10 h-12 border-slate-200 focus-visible:ring-pink-400"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShow(!show)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                            >
                                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg shadow-pink-500/20"
                    >
                        {loading ? "Updating..." : "Update password"}
                    </Button>
                </form>
            </div>
        </div>
    )
}