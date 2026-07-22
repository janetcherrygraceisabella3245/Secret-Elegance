import { useState } from "react"
import { Link, useLocation } from "wouter"
import {
    Heart,
    Mail,
    Lock,
    User,
    Phone,
    Eye,
    EyeOff,
    ArrowLeft,
    Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/hooks/AuthContext"
import { useToast } from "@/hooks/use-toast"

export default function Signup() {
    const [, setLocation] = useLocation()
    const { signup, loginWithGoogle, isLoading } = useAuth()
    const { toast } = useToast()
    const [showPassword, setShowPassword] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        agree: false,
    })

    const passwordChecks = [
        { label: "At least 8 characters", ok: form.password.length >= 8 },
        { label: "One uppercase letter", ok: /[A-Z]/.test(form.password) },
        { label: "One number", ok: /\d/.test(form.password) },
    ]

    const passwordStrength = passwordChecks.filter((c) => c.ok).length

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!form.agree) {
            toast({
                title: "Please accept the terms",
                description: "You must agree to our Terms and Privacy Policy.",
                variant: "destructive",
            })
            return
        }

        if (!passwordChecks.every((c) => c.ok)) {
            toast({
                title: "Weak password",
                description: "Please meet all password requirements.",
                variant: "destructive",
            })
            return
        }

        try {
            const { needsEmailConfirmation } = await signup(form)
            if (needsEmailConfirmation) {
                toast({
                    title: "Check your email",
                    description: `We've sent a confirmation link to ${form.email}.`,
                })
                setLocation("/login")
            } else {
                toast({
                    title: "Welcome to Secret Elegance",
                    description: "Your account has been created.",
                })
                setLocation("/")
            }
        } catch (err: any) {
            toast({
                title: "Sign up failed",
                description: err.message || "Something went wrong. Please try again.",
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
                title: "Google sign up failed",
                description: err.message,
                variant: "destructive",
            })
            setGoogleLoading(false)
        }
    }

    return (
        <div className="min-h-[100dvh] flex flex-col lg:flex-row bg-gradient-to-br from-rose-50 via-white to-rose-50">
            {/* Left – Brand Panel */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#2D3142] to-[#1a1d2e]">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-32 right-20 w-80 h-80 bg-[#E8798A] rounded-full blur-3xl" />
                    <div className="absolute bottom-20 left-10 w-96 h-96 bg-rose-300 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 flex flex-col justify-between p-12 w-full">
                    <Link href="/" className="flex items-center gap-2 w-fit">
                        <Heart className="w-7 h-7 text-[#E8798A] fill-[#E8798A]" />
                        <span className="text-2xl font-serif text-white">Secret Elegance</span>
                    </Link>

                    <div className="max-w-md">
                        <h2 className="text-4xl font-serif text-white leading-tight mb-4">
                            Begin your{" "}
                            <span className="italic text-[#E8798A]">journey of elegance</span>.
                        </h2>
                        <p className="text-gray-300 leading-relaxed mb-8">
                            Join those who trust us with their most intimate moments.
                            Create your account to unlock a seamless experience.
                        </p>

                        <ul className="space-y-3">
                            {[
                                "Curated, elegant companions",
                                "Flexible scheduling — 24/7 access",
                                "Discreet & private booking system",
                                "Concierge-grade experiences",
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-3 text-gray-300">
                  <span className="w-6 h-6 rounded-full bg-[#E8798A] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Heart className="w-6 h-6 fill-[#E8798A] text-[#E8798A]" />
                        <span className="font-serif text-xl tracking-widest text-[#E8798A]">SE</span>
                    </div>
                </div>
            </div>

            {/* Right – Form */}
            <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 py-12">
                <div className="w-full max-w-md mx-auto">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#E8798A] mb-8 transition-colors lg:hidden"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to home
                    </Link>

                    <div className="lg:hidden flex items-center gap-2 mb-8">
                        <Heart className="w-6 h-6 text-[#E8798A] fill-[#E8798A]" />
                        <span className="text-xl font-serif text-[#2D3142]">Secret Elegance</span>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-serif text-[#2D3142] mb-2">Create your account</h1>
                        <p className="text-gray-500">Join Secret Elegance and begin your journey.</p>
                    </div>

                    {/* Google Signup */}
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleGoogle}
                        disabled={googleLoading}
                        className="w-full h-12 rounded-full border-gray-200 hover:bg-gray-50 text-gray-700 mb-6"
                    >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        {googleLoading ? "Redirecting..." : "Sign up with Google"}
                    </Button>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-xs text-gray-400 uppercase tracking-wider">or sign up with email</span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <Label htmlFor="firstName" className="text-[#2D3142]">First name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="firstName"
                                        required
                                        value={form.firstName}
                                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                                        className="pl-10 h-12 rounded-xl border-gray-200 focus-visible:ring-[#E8798A] focus-visible:border-[#E8798A]"
                                        placeholder="Jane"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName" className="text-[#2D3142]">Last name</Label>
                                <Input
                                    id="lastName"
                                    required
                                    value={form.lastName}
                                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                                    className="h-12 rounded-xl border-gray-200 focus-visible:ring-[#E8798A] focus-visible:border-[#E8798A]"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-[#2D3142]">Email address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="pl-10 h-12 rounded-xl border-gray-200 focus-visible:ring-[#E8798A] focus-visible:border-[#E8798A]"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-[#2D3142]">Phone number</Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    id="phone"
                                    type="tel"
                                    required
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    className="pl-10 h-12 rounded-xl border-gray-200 focus-visible:ring-[#E8798A] focus-visible:border-[#E8798A]"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-[#2D3142]">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    className="pl-10 pr-10 h-12 rounded-xl border-gray-200 focus-visible:ring-[#E8798A] focus-visible:border-[#E8798A]"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>

                            {form.password && (
                                <div className="space-y-2 pt-1">
                                    <div className="flex gap-1">
                                        {[0, 1, 2].map((i) => (
                                            <div
                                                key={i}
                                                className={`h-1 flex-1 rounded-full transition-colors ${
                                                    i < passwordStrength
                                                        ? passwordStrength === 1
                                                            ? "bg-red-400"
                                                            : passwordStrength === 2
                                                                ? "bg-amber-400"
                                                                : "bg-green-500"
                                                        : "bg-gray-200"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <ul className="space-y-1">
                                        {passwordChecks.map((c) => (
                                            <li
                                                key={c.label}
                                                className={`flex items-center gap-2 text-xs transition-colors ${
                                                    c.ok ? "text-green-600" : "text-gray-400"
                                                }`}
                                            >
                                                <Check className="w-3 h-3" strokeWidth={3} />
                                                {c.label}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="flex items-start gap-2 pt-2">
                            <Checkbox
                                id="agree"
                                checked={form.agree}
                                onCheckedChange={(v) => setForm({ ...form, agree: !!v })}
                                className="mt-0.5 border-gray-300 data-[state=checked]:bg-[#E8798A] data-[state=checked]:border-[#E8798A]"
                            />
                            <Label htmlFor="agree" className="text-sm text-gray-500 cursor-pointer leading-relaxed">
                                I agree to the{" "}
                                <Link href="/privacy" className="text-[#E8798A] hover:text-[#d66b7c]">Terms of Service</Link>{" "}
                                and{" "}
                                <Link href="/privacy" className="text-[#E8798A] hover:text-[#d66b7c]">Privacy Policy</Link>.
                            </Label>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-[#E8798A] hover:bg-[#d66b7c] text-white rounded-full font-medium shadow-lg shadow-[#E8798A]/20 transition-all mt-2"
                        >
                            {isLoading ? "Creating account..." : "Create account"}
                        </Button>
                    </form>

                    <p className="text-center text-gray-500 mt-6">
                        Already have an account?{" "}
                        <Link href="/login" className="text-[#E8798A] hover:text-[#d66b7c] font-medium">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}