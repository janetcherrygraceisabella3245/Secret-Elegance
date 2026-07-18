import { useGetAdminStats, useGetRecentActivity } from "@/hooks/useAdmin"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Users, Heart, Calendar as CalIcon, DollarSign } from "lucide-react"

export default function AdminDashboard() {
  const { data: stats } = useGetAdminStats()
  const { data: activity = [] } = useGetRecentActivity()

  if (!stats) return <div>Loading...</div>

  const statCards = [
    { title: "Total Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-green-600 bg-green-100" },
    { title: "Active Bookings", value: stats.confirmedBookings.toString(), icon: CalIcon, color: "text-blue-600 bg-blue-100" },
    { title: "Total Clients", value: stats.totalClients.toString(), icon: Users, color: "text-purple-600 bg-purple-100" },
    { title: "Caregivers", value: stats.totalCaregivers.toString(), icon: Heart, color: "text-primary bg-primary/10" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Overview of platform activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="font-serif">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {activity.map(act => (
                <div key={act.id} className="flex items-start gap-4 pb-6 border-b last:border-0 last:pb-0">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div>
                    <p className="text-sm text-foreground/80">{act.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{new Date(act.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="font-serif">Schedule</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar mode="single" selected={new Date()} className="rounded-xl border" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
