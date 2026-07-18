import { ReactNode, useEffect } from "react"
import { useLocation } from "wouter"
import { Heart } from "lucide-react"
import { useAuth } from "@/hooks/AuthContext"

export function ProtectedRoute({ children }: { children: ReactNode }) {
    const { user, isInitialized } = useAuth()
    const [, setLocation] = useLocation()

    useEffect(() => {
        if (isInitialized && !user) {
            setLocation("/login")
        }
    }, [user, isInitialized, setLocation])

    if (!isInitialized) {
        return (
            <div className="min-h-[60dvh] flex items-center justify-center">
                <Heart className="w-8 h-8 text-pink-500 fill-pink-500 animate-pulse" />
            </div>
        )
    }

    if (!user) return null

    return <>{children}</>
}