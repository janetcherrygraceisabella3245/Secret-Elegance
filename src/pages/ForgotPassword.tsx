import { useState } from "react"
import { Link } from "wouter"
import { Heart, Mail, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/AuthContext"
import { useToast } from "@/hooks/use-toast"

export default function ForgotPassword() {
    const { resetPassword } = useAuth()
    const { toast } = useToast()
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await resetPassword(email)
            setSent(true)
            toast({ title: "Email sent", description: "Check your inbox for reset instructions." })
        } catch (err: any) {
            toast({ title: "Failed", description: err.message, variant: "destructive" })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-rose-50 px-6">
            <div className="w-full max-w-md">
                <Link href="/login" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-pink-500 mb-8">
                    <ArrowLeft className="w-4 h-4" /> Back to sign in
                </Link>

                <div className="flex items-center gap-2 mb-8">
                    <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
                    <span className="text-xl font-serif text-slate-800">Secret Elegance</span>
                </div>

                <h1 className="text-3xl font-serif text-slate-800 mb-2">Reset password</h1>
                <p className="text-slate-500 mb-8">
                    Enter your email and we'll send you a link to reset your password.
                </p>

                {sent ? (
                    <div className="bg-pink-50 border border-pink-200 rounded-2xl p-6 text-center">
                        <p className="text-slate-700">
                            A password reset link has been sent to <strong>{email}</strong>.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-700">Email address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 h-12 border-slate-200 focus-visible:ring-pink-400"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg shadow-pink-500/20"
                        >
                            {loading ? "Sending..." : "Send reset link"}
                        </Button>
                    </form>
                )}
            </div>
        </div>
    )
}