"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { mockBookings, mockEquipment } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, DollarSign, Clock, CreditCard } from "lucide-react"
import { format } from "date-fns"

export default function MyBookingsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "farmer")) {
      router.push("/dashboard")
    }
  }, [user, isLoading, router])

  if (isLoading || !user || user.role !== "farmer") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const myBookings = mockBookings.filter((b) => b.farmerId === user.id)
  const activeBookings = myBookings.filter((b) => b.status === "confirmed" || b.status === "pending")
  const pastBookings = myBookings.filter((b) => b.status === "completed" || b.status === "cancelled")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-600"
      case "pending":
        return "bg-yellow-600"
      case "completed":
        return "bg-blue-600"
      case "cancelled":
        return "bg-gray-600"
      default:
        return "bg-gray-600"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "text-green-600"
      case "pending":
        return "text-yellow-600"
      case "refunded":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  const BookingCard = ({ booking }: { booking: (typeof mockBookings)[0] }) => {
    const equipment = mockEquipment.find((e) => e.id === booking.equipmentId)
    if (!equipment) return null

    return (
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-4 flex-1">
              <div className="relative h-20 w-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={equipment.images[0] || "/placeholder.svg?height=80&width=80"}
                  alt={equipment.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg mb-1">{equipment.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {equipment.location}
                </CardDescription>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
              <span className={`text-xs font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
                {booking.paymentStatus === "paid" ? "Paid" : "Payment Pending"}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Rental Period</p>
                <p className="font-medium">
                  {format(booking.startDate, "MMM d")} - {format(booking.endDate, "MMM d, yyyy")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Total Price</p>
                <p className="font-medium">${booking.totalPrice}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Booked on {format(booking.createdAt, "MMM d, yyyy")}</span>
            </div>
            <div className="flex gap-2">
              {booking.paymentStatus === "pending" && (
                <Button size="sm" asChild>
                  <Link href={`/bookings/${booking.id}/payment`}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pay Now
                  </Link>
                </Button>
              )}
              <Button variant="outline" size="sm" asChild>
                <Link href={`/equipment/${equipment.id}`}>View Equipment</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
        <p className="text-muted-foreground">View and manage your equipment rentals</p>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active ({activeBookings.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({pastBookings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeBookings.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">You don't have any active bookings</p>
                <Button asChild>
                  <Link href="/equipment">Browse Equipment</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            activeBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastBookings.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-muted-foreground">No past bookings</p>
              </CardContent>
            </Card>
          ) : (
            pastBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
