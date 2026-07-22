import { Route, Switch, Router as WouterRouter } from "wouter"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"

import { AuthProvider } from "@/hooks/AuthContext"
import { BookingProvider } from "@/hooks/BookingContext"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"

// Public Pages
import Home from "@/pages/Home"
import Services from "@/pages/Services"
import Rates from "@/pages/Rates"
import About from "@/pages/About"
import Contact from "@/pages/Contact"
import FAQ from "@/pages/FAQ"
import Privacy from "@/pages/Privacy"
import AuthCallback from "@/pages/AuthCallBack"

// Auth Pages
import Login from "@/pages/Login"
import Signup from "@/pages/Signup"
import ForgotPassword from "@/pages/ForgotPassword"
import ResetPassword from "@/pages/ResetPassword"

// Booking Pages
import BookService from "@/pages/book/Service"
import BookCaregiver from "@/pages/book/Caregiver"
import BookDate from "@/pages/book/Date"
import BookTime from "@/pages/book/Time"
import BookDuration from "@/pages/book/Duration"
import BookLocation from "@/pages/book/Location"
import BookSummary from "@/pages/book/Summary"
import BookPayment from "@/pages/book/Payment"
import BookConfirmation from "@/pages/book/Confirmation"

// Admin Pages
import AdminLayout from "@/components/admin/AdminLayout"
import AdminLogin from "@/pages/admin/Login"

import NotFound from "@/pages/not-found"
import CompanionProfile from "@/pages/companions/[id].tsx";
import Companions from "@/pages/Companions.tsx";
import AdminBookings from "@/pages/admin/Bookings.tsx";
import AdminPaymentDetail from "@/pages/admin/PaymentDetail.tsx";

const queryClient = new QueryClient()

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="flex flex-col min-h-[100dvh]">
        <Nav />
        <main className="flex-1 flex flex-col w-full">{children}</main>
        <Footer />
      </div>
  )
}

function Router() {
  return (
      <Switch>
        {/* Auth Routes - no layout, no nav/footer */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/auth/callback" component={AuthCallback} />

        {/* Admin Auth Route - no layout */}
        <Route path="/admin/login" component={AdminLogin} />

        {/* Admin Routes with Layout */}
        <Route path="/admin">
          <AdminLayout>
            <Switch>
              {/*<Route path="/admin/clients" component={AdminClients} />*/}
              {/*<Route path="/admin/messages" component={AdminMessages} />*/}
              <Route component={NotFound} />
            </Switch>
          </AdminLayout>
        </Route>

        <Route path="/admin/*">
          <AdminLayout>
            <Switch>
              {/*<Route path="/admin/clients" component={AdminClients} />*/}
              {/*<Route path="/admin/messages" component={AdminMessages} />*/}
              <Route path="/admin/login" component={AdminLogin} />
              <Route path="/admin/bookings" component={AdminBookings} />
              <Route path="/admin/payment/:id" component={AdminPaymentDetail}/>
              <Route component={NotFound} />
            </Switch>
          </AdminLayout>
        </Route>

        <Route path="*">
          <PublicLayout>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/services" component={Services} />
              <Route path="/companion" component={Companions} />
              <Route path="/companion/:id" component={CompanionProfile} />
              <Route path="/rates" component={Rates} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/faq" component={FAQ} />
              <Route path="/privacy" component={Privacy} />

              {/* Booking Wizard - Protected (requires auth) */}
              <Route path="/book/service">
                <ProtectedRoute>
                  <BookService />
                </ProtectedRoute>
              </Route>
              <Route path="/book/companion">
                <ProtectedRoute>
                  <BookCaregiver />
                </ProtectedRoute>
              </Route>
              <Route path="/companions/:id">
                <ProtectedRoute>
                  <CompanionProfile />
                </ProtectedRoute>
              </Route>
              <Route path="/book/date">
                <ProtectedRoute>
                  <BookDate />
                </ProtectedRoute>
              </Route>
              <Route path="/book/time">
                <ProtectedRoute>
                  <BookTime />
                </ProtectedRoute>
              </Route>
              <Route path="/book/duration">
                <ProtectedRoute>
                  <BookDuration />
                </ProtectedRoute>
              </Route>
              <Route path="/book/location">
                <ProtectedRoute>
                  <BookLocation />
                </ProtectedRoute>
              </Route>
              <Route path="/book/summary">
                <ProtectedRoute>
                  <BookSummary />
                </ProtectedRoute>
              </Route>
              <Route path="/book/payment">
                <ProtectedRoute>
                  <BookPayment />
                </ProtectedRoute>
              </Route>
              <Route path="/book/confirmation">
                <ProtectedRoute>
                  <BookConfirmation />
                </ProtectedRoute>
              </Route>

              <Route component={NotFound} />
            </Switch>
          </PublicLayout>
        </Route>
      </Switch>
  )
}

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <BookingProvider>
              <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                <Router />
              </WouterRouter>
              <Toaster />
            </BookingProvider>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
  )
}

export default App