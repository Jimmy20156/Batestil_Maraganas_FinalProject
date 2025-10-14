"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function AddEquipmentPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    pricePerDay: "",
    location: "",
    specifications: "",
  })

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "owner")) {
      router.push("/dashboard")
    }
  }, [user, isLoading, router])

  if (isLoading || !user || user.role !== "owner") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In production, this would save to database
    toast({
      title: "Equipment Added",
      description: "Your equipment has been successfully listed.",
    })

    router.push("/my-equipment")
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/my-equipment">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to My Equipment
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Add New Equipment</CardTitle>
          <CardDescription>List your farm equipment to start earning rental income</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Equipment Name</Label>
              <Input
                id="name"
                placeholder="e.g., John Deere 8R Tractor"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleChange("category", value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tractor">Tractor</SelectItem>
                  <SelectItem value="Harvester">Harvester</SelectItem>
                  <SelectItem value="Planter">Planter</SelectItem>
                  <SelectItem value="Sprayer">Sprayer</SelectItem>
                  <SelectItem value="Tillage">Tillage Equipment</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your equipment, its condition, and key features..."
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pricePerDay">Price per Day ($)</Label>
                <Input
                  id="pricePerDay"
                  type="number"
                  placeholder="450"
                  value={formData.pricePerDay}
                  onChange={(e) => handleChange("pricePerDay", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="City, State"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specifications">Specifications (Optional)</Label>
              <Textarea
                id="specifications"
                placeholder="Engine Power: 370 HP&#10;Year: 2022&#10;Fuel Type: Diesel"
                value={formData.specifications}
                onChange={(e) => handleChange("specifications", e.target.value)}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">Enter each specification on a new line</p>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                Add Equipment
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push("/my-equipment")}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
