"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { mockEquipment } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { format, differenceInDays } from "date-fns"
import { CalendarIcon, ArrowLeft, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BookEquipmentPage({ params }: { params: { id: string } }) {
  const { id } = params
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [error, setError] = useState("")

  const equipment = mockEquipment.find((e) => e.id === id)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!equipment) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Equipment not found</p>
      </div>
    )
  }

  const calculateTotal = () => {
    if (!startDate || !endDate) return 0
    const days = differenceInDays(endDate, startDate) + 1
    return days * equipment.pricePerDay
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!startDate || !endDate) {
      setError("Please select both start and end dates")
      return
    }

    if (startDate < new Date()) {
      setError("Start date cannot be in the past")
      return
    }

    if (endDate < startDate) {
      setError("End date must be after start date")
      return
    }

    // In production, this would create a booking in the database
    toast({
      title: "Booking Request Sent",
      description: "The equipment owner will review your booking request.",
    })

    router.push("/my-bookings")
  }

  const totalDays = startDate && endDate ? differenceInDays(endDate, startDate) + 1 : 0
  const totalPrice = calculateTotal()

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href={`/equipment/${id}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Equipment
        </Link>
      </Button>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Book Equipment</CardTitle>
              <CardDescription>Select your rental dates for {equipment.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !startDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !endDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          disabled={(date) => date < (startDate || new Date())}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <Alert>
                  <AlertDescription>
                    Your booking request will be sent to the equipment owner for approval. You'll be notified once they
                    respond.
                  </AlertDescription>
                </Alert>

                <Button type="submit" className="w-full" size="lg" disabled={!startDate || !endDate}>
                  Submit Booking Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Equipment</p>
                <p className="font-medium">{equipment.name}</p>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground mb-1">Daily Rate</p>
                <p className="font-medium">${equipment.pricePerDay}/day</p>
              </div>

              {startDate && endDate && (
                <>
                  <Separator />

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Rental Period</p>
                    <p className="font-medium">
                      {format(startDate, "MMM d")} - {format(endDate, "MMM d, yyyy")}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{totalDays} days</p>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Rental ({totalDays} days)</span>
                      <span className="text-sm">${totalPrice}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${totalPrice}</span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
