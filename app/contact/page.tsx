"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const handleEmailClick = () => {
    window.location.href = "mailto:info@rangavisual.com"
  }

  return (
    <main className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-xl text-gray-400">Get in touch for bookings and inquiries</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Mail className="h-5 w-5 text-yellow-500" />
                Email Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">For bookings and general inquiries</p>
              <Button onClick={handleEmailClick} className="btn-primary w-full">
                info@rangavisual.com
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Phone className="h-5 w-5 text-yellow-500" />
                Call Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">Speak directly with our team</p>
              <p className="text-white text-lg font-semibold">+1 (555) 123-4567</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin className="h-5 w-5 text-yellow-500" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                123 Creative District
                <br />
                Studio City, CA 91604
                <br />
                United States
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                Business Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-400 space-y-1">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Book?</h2>
          <p className="text-gray-400 mb-6">
            Click any "Book Now" button on our equipment to start your rental request via email.
          </p>
          <Button onClick={() => (window.location.href = "/rentals")} className="btn-primary">
            Browse Equipment
          </Button>
        </div>
      </div>
    </main>
  )
}
