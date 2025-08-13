import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Award, Users, Clock } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">About Ranga Visual</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Your trusted partner for professional visual equipment rentals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Founded in 2018, Ranga Visual emerged from a simple vision: to make professional-grade visual equipment
              accessible to creators of all levels. What started as a small collection of cameras and lighting gear has
              grown into a comprehensive rental service trusted by photographers, filmmakers, and creative professionals
              across the region.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              We believe that great visuals shouldn't be limited by budget constraints. Our carefully curated inventory
              features the latest technology and timeless classics, all maintained to the highest standards and
              available at competitive rates.
            </p>
          </div>
          <div className="relative">
            <Image
              src="/images/ranga-logo-about.jpg"
              alt="Ranga Visual team workspace"
              width={600}
              height={500}
              className="rounded-lg shadow-2xl object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="bg-gray-800 border-gray-700 text-center">
            <CardContent className="p-6">
              <Camera className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Premium Equipment</h3>
              <p className="text-gray-400">Latest professional gear from top brands</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 text-center">
            <CardContent className="p-6">
              <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Quality Assured</h3>
              <p className="text-gray-400">Rigorous maintenance and testing standards</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 text-center">
            <CardContent className="p-6">
              <Users className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Expert Support</h3>
              <p className="text-gray-400">Knowledgeable team ready to help</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 text-center">
            <CardContent className="p-6">
              <Clock className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Flexible Rentals</h3>
              <p className="text-gray-400">Daily, weekly, and custom rental periods</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Create?</h2>
          <p className="text-xl text-gray-300 mb-6">
            Join hundreds of satisfied creators who trust Ranga Visual for their equipment needs.
          </p>
          <a href="/rentals" className="btn-primary">
            Browse Our Equipment
          </a>
        </div>
      </div>
    </main>
  )
}
