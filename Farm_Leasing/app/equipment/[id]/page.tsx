"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { mockEquipment } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, DollarSign, Calendar, ArrowLeft, CheckCircle2 } from "lucide-react"

export default function EquipmentDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const { user } = useAuth()
  const router = useRouter()

  const equipment = mockEquipment.find((e) => e.id === id)

  if (!equipment) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Equipment not found</p>
      </div>
    )
  }

  const handleBookNow = () => {
    if (!user) {
      router.push("/login")
    } else {
      router.push(`/equipment/${id}/book`)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/equipment">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Equipment
        </Link>
      </Button>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="relative h-[400px] rounded-lg overflow-hidden bg-muted">
            <Image
              src={equipment.images[0] || "/placeholder.svg?height=400&width=600"}
              alt={equipment.name}
              fill
              className="object-cover"
            />
            {equipment.availability && <Badge className="absolute top-4 right-4 bg-green-600">Available Now</Badge>}
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-3xl font-bold">{equipment.name}</h1>
              <Badge variant="outline" className="text-sm">
                {equipment.category}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{equipment.location}</span>
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">{equipment.description}</p>
          </div>

          {equipment.specifications && (
            <>
              <Separator />
              <div>
                <h2 className="text-xl font-semibold mb-4">Specifications</h2>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(equipment.specifications).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-sm text-muted-foreground">{key}</p>
                      <p className="font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <Separator />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Rental Price
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold">${equipment.pricePerDay}</span>
                <span className="text-muted-foreground">per day</span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Flexible rental periods</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Insurance included</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>24/7 support</span>
                </li>
              </ul>
              <Button className="w-full" size="lg" onClick={handleBookNow} disabled={!equipment.availability}>
                <Calendar className="mr-2 h-4 w-4" />
                {equipment.availability ? "Book Now" : "Currently Unavailable"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
