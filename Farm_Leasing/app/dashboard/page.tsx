"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { mockBookings, mockEquipment } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Tractor, Calendar, DollarSign, Package } from "lucide-react"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const userBookings = mockBookings.filter((b) => b.farmerId === user.id)
  const activeBookings = userBookings.filter((b) => b.status === "confirmed" || b.status === "pending")
  const totalSpent = userBookings.filter((b) => b.paymentStatus === "paid").reduce((sum, b) => sum + b.totalPrice, 0)
  const upcomingBookings = activeBookings.filter((b) => new Date(b.startDate) > new Date())

  const myEquipment = mockEquipment.filter((e) => e.ownerId === user.id)
  const equipmentBookings = mockBookings.filter((b) => b.ownerId === user.id)
  const totalEarned = equipmentBookings
    .filter((b) => b.paymentStatus === "paid")
    .reduce((sum, b) => sum + b.totalPrice, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}</h1>
        <p className="text-muted-foreground">
          {user.role === "farmer" && "Manage your equipment rentals and bookings"}
          {user.role === "owner" && "Manage your equipment listings and earnings"}
          {user.role === "admin" && "Manage the platform and monitor activity"}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {user.role === "farmer" ? "Active Bookings" : "Listed Equipment"}
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {user.role === "farmer" ? activeBookings.length : myEquipment.length}
            </div>
            <p className="text-xs text-muted-foreground">
              {user.role === "farmer" ? "Current rentals" : "Available for rent"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {user.role === "farmer" ? "Total Spent" : "Total Earned"}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${user.role === "farmer" ? totalSpent : totalEarned}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {user.role === "farmer"
                ? upcomingBookings.length
                : equipmentBookings.filter((b) => b.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {user.role === "farmer" ? "Scheduled rentals" : "Pending bookings"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {user.role === "farmer"
                ? "Available Equipment"
                : user.role === "owner"
                  ? "My Equipment"
                  : "Total Equipment"}
            </CardTitle>
            <Tractor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {user.role === "farmer" ? mockEquipment.length : myEquipment.length}
            </div>
            <p className="text-xs text-muted-foreground">
              {user.role === "farmer" ? "Available to rent" : "Listed items"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {user.role === "farmer" && (
              <>
                <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                  <Link href="/equipment">
                    <Tractor className="mr-2 h-4 w-4" />
                    Browse Equipment
                  </Link>
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                  <Link href="/my-bookings">
                    <Calendar className="mr-2 h-4 w-4" />
                    View My Bookings
                  </Link>
                </Button>
              </>
            )}
            {user.role === "owner" && (
              <>
                <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                  <Link href="/my-equipment">
                    <Tractor className="mr-2 h-4 w-4" />
                    Manage Equipment
                  </Link>
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                  <Link href="/my-equipment/add">
                    <Package className="mr-2 h-4 w-4" />
                    Add New Equipment
                  </Link>
                </Button>
              </>
            )}
            {user.role === "admin" && (
              <>
                <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                  <Link href="/admin">
                    <Package className="mr-2 h-4 w-4" />
                    Admin Panel
                  </Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest transactions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            {user.role === "farmer" && userBookings.length > 0 ? (
              <div className="space-y-2">
                {userBookings.slice(0, 3).map((booking) => {
                  const equipment = mockEquipment.find((e) => e.id === booking.equipmentId)
                  return (
                    <div key={booking.id} className="text-sm">
                      <p className="font-medium">{equipment?.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {booking.status} - ${booking.totalPrice}
                      </p>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No recent activity</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
