"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  X,
  Star,
  Shield,
  Headphones,
  Clock,
  Camera,
  Award,
  CheckCircle,
  Heart,
  Share2,
} from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import BookingModal from "./booking-modal"

interface RentalItem {
  id: string
  name: string
  price: string
  image?: string
  coverImage?: string
  images?: string[]
  description: string
}

interface ViewRentalItemModalProps {
  isOpen: boolean
  onClose: () => void
  item: RentalItem | null
}

export default function ViewRentalItemModal({ isOpen, onClose, item }: ViewRentalItemModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  if (!item) return null

  // Combine all images (cover + additional)
  const allImages = [item.coverImage || item.image, ...(item.images || [])].filter(Boolean)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  const handleBookNow = () => {
    setIsBookingOpen(true)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="  bg-gradient-to-br from-gray-900/98 to-black/98 backdrop-blur-xl border border-gray-700/50 text-white p-0 w-full h-[80vh] overflow-y-auto">

          <DialogHeader className="sr-only">
            <DialogTitle>{item.name} - Equipment Details</DialogTitle>
          </DialogHeader>

          {/* Custom Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50 w-full">
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-3xl font-bold text-white">{item.name}</h2>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-gray-300">4.9 (127 reviews)</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Available Now</Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsLiked(!isLiked)}
                className="text-gray-400 hover:text-red-400 hover:bg-red-400/10 w-10 h-10"
              >
                <Heart className={`h-6 w-6 ${isLiked ? "fill-current text-red-400" : ""}`} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-gray-700 w-10 h-10"
              >
                <Share2 className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-gray-400 hover:text-white hover:bg-gray-700 w-10 h-10"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row h-full">
            {/* Image Gallery Section - Wider */}
            <div className="xl:w-3/5 p-8">
              <div className="relative">
                <div className="aspect-[16/10] relative bg-gray-800 rounded-2xl overflow-hidden group shadow-2xl">
                  <Image
                    src={allImages[currentImageIndex] || "/placeholder.svg"}
                    alt={`${item.name} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                  />

                  {/* Navigation arrows */}
                  {allImages.length > 1 && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/60 border-gray-600 hover:bg-black/80 hover:border-cyan-400 transition-all duration-300 backdrop-blur-sm w-12 h-12"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-6 w-6 text-white" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/60 border-gray-600 hover:bg-black/80 hover:border-cyan-400 transition-all duration-300 backdrop-blur-sm w-12 h-12"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-6 w-6 text-white" />
                      </Button>
                    </>
                  )}

                  {/* Image counter */}
                  {allImages.length > 1 && (
                    <div className="absolute bottom-6 right-6 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-gray-600">
                      {currentImageIndex + 1} / {allImages.length}
                    </div>
                  )}
                </div>

                {/* Thumbnail strip */}
                {allImages.length > 1 && (
                  <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
                    {allImages.map((image, index) => (
                      <button
                        key={index}
                        className={`relative flex-shrink-0 w-24 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                          index === currentImageIndex
                            ? "border-cyan-400 scale-105 shadow-lg shadow-cyan-400/25"
                            : "border-gray-600 hover:border-gray-500"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Details Section - More spacious */}
            <div className="xl:w-2/5 p-8 border-l border-gray-700/50 space-y-8 overflow-y-auto">
              {/* Price Section */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3">
                    {item.price}
                  </div>
                  <p className="text-gray-400 mb-6">Professional daily rate</p>

                  <Button
                    onClick={handleBookNow}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
                  >
                    <Calendar className="h-6 w-6 mr-3" />
                    Book This Equipment
                  </Button>
                </div>
              </div>

              <Separator className="bg-gray-700/50" />

              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                  <Camera className="h-6 w-6 text-cyan-400" />
                  Description
                </h3>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </div>

              <Separator className="bg-gray-700/50" />

              {/* Features */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                  <Award className="h-6 w-6 text-cyan-400" />
                  What's Included
                </h3>
                <div className="space-y-3">
                  {[
                    "Professional grade equipment",
                    "Technical support included",
                    "Flexible rental periods",
                    "Quality guarantee",
                    "Setup assistance available",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="bg-gray-700/50" />

              {/* Additional Info */}
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                  <Shield className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
                  <p className="text-cyan-400 font-semibold">Insured Equipment</p>
                  <p className="text-gray-400 text-sm mt-1">Full coverage included</p>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                  <Headphones className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
                  <p className="text-cyan-400 font-semibold">24/7 Support</p>
                  <p className="text-gray-400 text-sm mt-1">Technical assistance</p>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                  <Clock className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
                  <p className="text-cyan-400 font-semibold">Flexible Terms</p>
                  <p className="text-gray-400 text-sm mt-1">Daily & weekly rates</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-white font-semibold text-lg mb-3">Need Help?</h4>
                <p className="text-gray-400 mb-4">Contact our equipment specialists</p>
                <div className="space-y-2">
                  <p className="text-cyan-400 flex items-center gap-2">
                    📞 <span>+250 786 008 625</span>
                  </p>
                  <p className="text-cyan-400 flex items-center gap-2">
                    📧 <span>rangavisuals@gmail.com</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  )
}
