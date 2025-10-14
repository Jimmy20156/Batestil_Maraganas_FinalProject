import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tractor, DollarSign, Shield, TrendingUp } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-muted/50 to-background py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-balance">Modern Farm Equipment at Your Fingertips</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Rent high-quality tractors, harvesters, and machinery without the massive upfront investment. Boost your
              farm's productivity today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild>
                <Link href="/equipment">Browse Equipment</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose FarmLease?</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
<span className="h-10 w-10 flex items-center justify-center text-primary mb-2 text-2xl">
  ₱
</span>             
                <CardTitle>Cost Effective</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Save thousands by renting instead of buying. Pay only for what you need, when you need it.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Tractor className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Modern Equipment</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Access the latest tractors, harvesters, and machinery with advanced technology.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Secure & Reliable</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All equipment is verified and insured. Transparent booking and payment system.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Earn Income</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Equipment owners can monetize idle machinery and generate passive income.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Transform Your Farming?</h2>
          <p className="text-lg opacity-90">Join thousands of farmers and equipment owners already using FarmLease</p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">Create Free Account</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
