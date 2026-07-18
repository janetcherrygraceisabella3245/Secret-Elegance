import { useState } from "react"
import { Link, useLocation } from "wouter"
import { Heart, Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/hooks/AuthContext"
import { useToast } from "@/hooks/use-toast"

export default function Login() {
    const [, setLocation] = useLocation()
    const { login, loginWithGoogle, isLoading } = useAuth()
    const { toast } = useToast()
    const [showPassword, setShowPassword] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    const [form, setForm] = useState({ email: "", password: "", remember: false })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await login(form.email, form.password)
            toast({ title: "Welcome back", description: "You've been signed in." })
            setLocation("/")
        } catch (err: any) {
            toast({
                title: "Sign in failed",
                description: err.message || "Please check your credentials and try again.",
                variant: "destructive",
            })
        }
    }

    const handleGoogle = async () => {
        setGoogleLoading(true)
        try {
            await loginWithGoogle()
        } catch (err: any) {
            toast({
                title: "Google sign in failed",
                description: err.message,
                variant: "destructive",
            })
            setGoogleLoading(false)
        }
    }

    return (
        <div className="min-h-[100dvh] flex flex-col lg:flex-row bg-gradient-to-br from-pink-50 via-white to-rose-50">
            {/* Left – Brand Panel */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-pink-100 via-rose-50 to-pink-50">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-pink-200 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-rose-200 rounded-full blur-3xl" />
                </div>
                <div className="relative z-10 flex flex-col justify-between p-12 w-full">
                    <Link href="/" className="flex items-center gap-2 w-fit">
                        <Heart className="w-7 h-7 text-pink-500 fill-pink-500" />
                        <span className="text-2xl font-serif text-slate-800">Secret Elegance</span>
                    </Link>

                    <div className="max-w-md">
                        <h2 className="text-4xl font-serif text-slate-800 leading-tight mb-4">
                            Welcome back to{" "}
                            <span className="italic text-pink-500">graceful care</span>.
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            Sign in to manage your bookings, connect with your caregivers,
                            and continue the exceptional care experience your family deserves.
                        </p>
                    </div>

                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()} Secret Elegance. Premium private concierge care.
                    </p>
                </div>
            </div>

            {/* Right – Form */}
            <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 py-12">
                <div className="w-full max-w-md mx-auto">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-pink-500 mb-8 transition-colors lg:hidden"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to home
                    </Link>

                    <div className="lg:hidden flex items-center gap-2 mb-8">
                        <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
                        <span className="text-xl font-serif text-slate-800">Secret Elegance</span>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-serif text-slate-800 mb-2">Sign in</h1>
                        <p className="text-slate-500">Enter your details to access your account.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-700">Email address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="pl-10 h-12 border-slate-200 focus-visible:ring-pink-400"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-slate-700">Password</Label>
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-pink-500 hover:text-pink-600"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    required
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    className="pl-10 pr-10 h-12 border-slate-200 focus-visible:ring-pink-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="remember"
                                checked={form.remember}
                                onCheckedChange={(v) => setForm({ ...form, remember: !!v })}
                            />
                            <Label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer">
                                Keep me signed in
                            </Label>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-medium shadow-lg shadow-pink-500/20 transition-all"
                        >
                            {isLoading ? "Signing in..." : "Sign in"}
                        </Button>
                    </form>

                    <div className="my-8 flex items-center gap-4">
                        <div className="flex-1 h-px bg-slate-200" />
                        <span className="text-xs text-slate-400 uppercase tracking-wider">or</span>
                        <div className="flex-1 h-px bg-slate-200" />
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleGoogle}
                        disabled={googleLoading}
                        className="w-full h-12 rounded-full border-slate-200 hover:bg-slate-50"
                    >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        {googleLoading ? "Redirecting..." : "Continue with Google"}
                    </Button>

                    <p className="text-center text-slate-600 mt-8">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-pink-500 hover:text-pink-600 font-medium">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}