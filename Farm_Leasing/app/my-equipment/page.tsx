"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"
import { mockEquipment } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, MapPin, DollarSign, Edit } from "lucide-react"

export default function MyEquipmentPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [equipment, setEquipment] = useState(mockEquipment)

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "owner")) {
      router.push("/dashboard")
    }
  }, [user, isLoading, router])

  if (isLoading || !user || user.role !== "owner") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const myEquipment = equipment.filter((e) => e.ownerId === user.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Equipment</h1>
          <p className="text-muted-foreground">Manage your equipment listings and availability</p>
        </div>
        <Button asChild>
          <Link href="/my-equipment/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Equipment
          </Link>
        </Button>
      </div>

      {myEquipment.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-muted-foreground mb-4">You haven't listed any equipment yet</p>
            <Button asChild>
              <Link href="/my-equipment/add">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Equipment
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myEquipment.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative h-48 bg-muted">
                <Image
                  src={item.images[0] || "/placeholder.svg?height=200&width=400"}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                <Badge className={`absolute top-2 right-2 ${item.availability ? "bg-green-600" : "bg-gray-600"}`}>
                  {item.availability ? "Available" : "Unavailable"}
                </Badge>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {item.location}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{item.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold">${item.pricePerDay}</span>
                  <span className="text-sm text-muted-foreground">/day</span>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent" asChild>
                  <Link href={`/my-equipment/${item.id}/edit`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" asChild>
                  <Link href={`/equipment/${item.id}`}>View</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
