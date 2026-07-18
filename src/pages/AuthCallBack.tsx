import { useEffect } from "react"
import { useLocation } from "wouter"
import { Heart } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function AuthCallback() {
    const [, setLocation] = useLocation()

    useEffect(() => {
        // Supabase auto-handles the session from URL hash
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                setLocation("/")
            } else {
                setLocation("/login")
            }
        })
    }, [setLocation])

    return (
        <div className="min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-rose-50">
            <div className="text-center">
                <Heart className="w-12 h-12 text-pink-500 fill-pink-500 mx-auto mb-4 animate-pulse" />
                <p className="text-slate-600 font-serif text-lg">Signing you in...</p>
            </div>
        </div>
    )
}