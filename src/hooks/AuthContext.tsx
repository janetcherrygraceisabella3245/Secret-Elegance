import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { Session, User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"

export interface Profile {
    id: string
    first_name: string | null
    last_name: string | null
    phone: string | null
    avatar_url: string | null
}

interface SignupData {
    firstName: string
    lastName: string
    email: string
    phone: string
    password: string
}

interface AuthContextType {
    user: User | null
    profile: Profile | null
    session: Session | null
    isLoading: boolean
    isInitialized: boolean
    login: (email: string, password: string) => Promise<void>
    signup: (data: SignupData) => Promise<{ needsEmailConfirmation: boolean }>
    loginWithGoogle: () => Promise<void>
    logout: () => Promise<void>
    resetPassword: (email: string) => Promise<void>
    updatePassword: (password: string) => Promise<void>
    refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [profile, setProfile] = useState<Profile | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isInitialized, setIsInitialized] = useState(false)

    const fetchProfile = async (userId: string) => {
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single()

        if (!error && data) {
            setProfile(data as Profile)
        }
    }

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setUser(session?.user ?? null)
            if (session?.user) fetchProfile(session.user.id)
            setIsInitialized(true)
        })

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setUser(session?.user ?? null)
            if (session?.user) {
                fetchProfile(session.user.id)
            } else {
                setProfile(null)
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    const login = async (email: string, password: string) => {
        setIsLoading(true)
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password })
            if (error) throw error
        } finally {
            setIsLoading(false)
        }
    }

    const signup = async (data: SignupData) => {
        setIsLoading(true)
        try {
            const { data: authData, error } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        first_name: data.firstName,
                        last_name: data.lastName,
                        phone: data.phone,
                    },
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            })
            if (error) throw error

            // If email confirmation is disabled, user is signed in immediately
            const needsEmailConfirmation = !authData.session
            return { needsEmailConfirmation }
        } finally {
            setIsLoading(false)
        }
    }

    const loginWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })
        if (error) throw error
    }

    const logout = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
    }

    const resetPassword = async (email: string) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        })
        if (error) throw error
    }

    const updatePassword = async (password: string) => {
        const { error } = await supabase.auth.updateUser({ password })
        if (error) throw error
    }

    const refreshProfile = async () => {
        if (user) await fetchProfile(user.id)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                profile,
                session,
                isLoading,
                isInitialized,
                login,
                signup,
                loginWithGoogle,
                logout,
                resetPassword,
                updatePassword,
                refreshProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth must be used within AuthProvider")
    return ctx
}