import { ReactNode } from "react"
import { Link, useLocation } from "wouter"
import {  Calendar, LogOut } from "lucide-react"

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation()
  
  const isAuthenticated = localStorage.getItem("admin_auth") === "true"
  
  if (!isAuthenticated && location !== "/admin/login") {
    setLocation("/admin/login")
    return null
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_auth")
    setLocation("/admin/login")
  }

  const links = [
    { href: "/admin/bookings", label: "Bookings", icon: Calendar },
  ]

  return (
    <div className="flex h-screen bg-gray-50/50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col h-full shrink-0">
        <div className="h-20 flex items-center px-6 border-b">
          <span className="font-serif text-xl font-medium tracking-tight">Admin Console</span>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-2">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium ${
                location.startsWith(link.href) 
                  ? "bg-primary text-white shadow-sm" 
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
