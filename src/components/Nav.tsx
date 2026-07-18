import * as React from "react"
import { Link, useLocation } from "wouter"
import { Heart, Menu, X, User, LogOut, Calendar, Settings } from "lucide-react"
import { useAuth } from "@/hooks/AuthContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export function Nav() {
  const [location, setLocation] = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const { user, profile, logout, isInitialized } = useAuth()

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Caregivers", href: "/caregivers" },
    { label: "FAQ", href: "/faq" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ]

  // Only render on non-admin routes
  if (location.startsWith("/admin") || location.startsWith("/book/")) return null

  const handleLogout = async () => {
    await logout()
    setIsMobileMenuOpen(false)
    setLocation("/")
  }

  const displayName =
      profile?.first_name || user?.email?.split("@")[0] || "Account"
  const initial =
      profile?.first_name?.[0]?.toUpperCase() ||
      user?.email?.[0]?.toUpperCase() ||
      "?"

  return (
      <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/80 backdrop-blur-xl transition-all">
        <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-2 rounded-xl text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <Heart className="w-5 h-5" />
            </div>
            <span className="font-serif text-2xl font-medium tracking-tight text-foreground">
            Secret Elegance
          </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                        href={link.href}
                        className={`text-sm font-medium transition-colors hover:text-primary ${
                            location === link.href ? "text-primary" : "text-muted-foreground"
                        }`}
                    >
                      {link.label}
                    </Link>
                  </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              {/* Auth-aware area */}
              {isInitialized && (
                  <>
                    {user ? (
                        <>
                          <Link
                              href="/book/service"
                              className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm h-11 px-6 py-2"
                          >
                            Book Now
                          </Link>

                          <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-2 h-11 pl-1 pr-4 rounded-full border border-border hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40">
                              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                                {initial}
                              </div>
                              <span className="text-sm font-medium text-foreground">
                          {displayName}
                        </span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                              <DropdownMenuLabel>
                                <div className="flex flex-col gap-0.5">
                                  <p className="text-sm font-medium">
                                    {profile?.first_name} {profile?.last_name}
                                  </p>
                                  <p className="text-xs text-muted-foreground font-normal truncate">
                                    {user.email}
                                  </p>
                                </div>
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem asChild>
                                <Link href="/account" className="cursor-pointer">
                                  <User className="w-4 h-4 mr-2" /> My Account
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href="/account/bookings" className="cursor-pointer">
                                  <Calendar className="w-4 h-4 mr-2" /> My Bookings
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href="/account/settings" className="cursor-pointer">
                                  <Settings className="w-4 h-4 mr-2" /> Settings
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                  onClick={handleLogout}
                                  className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50"
                              >
                                <LogOut className="w-4 h-4 mr-2" /> Sign out
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </>
                    ) : (
                        <>
                          <Link
                              href="/login"
                              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-3"
                          >
                            Sign in
                          </Link>
                          <Link
                              href="/signup"
                              className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm h-11 px-6 py-2"
                          >
                            Get Started
                          </Link>
                        </>
                    )}
                  </>
              )}
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button
              className="md:hidden p-2 text-foreground"
              onClick={toggleMenu}
              aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-border p-4 flex flex-col gap-4 shadow-lg animate-in fade-in slide-in-from-top-4">
              {/* User Card (Mobile) */}
              {isInitialized && user && (
                  <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                      {initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {profile?.first_name} {profile?.last_name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
              )}

              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                            location === link.href
                                ? "bg-primary/5 text-primary"
                                : "text-muted-foreground hover:bg-muted"
                        }`}
                    >
                      {link.label}
                    </Link>
                ))}

                {/* Account links (Mobile, signed in) */}
                {isInitialized && user && (
                    <>
                      <div className="h-px bg-border my-2" />
                      <Link
                          href="/account"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="p-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted flex items-center gap-2"
                      >
                        <User className="w-4 h-4" /> My Account
                      </Link>
                      <Link
                          href="/account/bookings"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="p-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted flex items-center gap-2"
                      >
                        <Calendar className="w-4 h-4" /> My Bookings
                      </Link>
                    </>
                )}
              </nav>

              <div className="pt-4 border-t border-border flex flex-col gap-2">
                {isInitialized && (
                    <>
                      {user ? (
                          <>
                            <Link
                                href="/book/service"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex w-full items-center justify-center whitespace-nowrap rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-6"
                            >
                              Book Now
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium border border-border text-red-600 hover:bg-red-50 h-11 px-6"
                            >
                              <LogOut className="w-4 h-4" /> Sign out
                            </button>
                          </>
                      ) : (
                          <>
                            <Link
                                href="/signup"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex w-full items-center justify-center whitespace-nowrap rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-6"
                            >
                              Get Started
                            </Link>
                            <Link
                                href="/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex w-full items-center justify-center whitespace-nowrap rounded-full text-sm font-medium border border-border text-foreground hover:bg-muted h-11 px-6"
                            >
                              Sign in
                            </Link>
                          </>
                      )}
                    </>
                )}
              </div>
            </div>
        )}
      </header>
  )
}