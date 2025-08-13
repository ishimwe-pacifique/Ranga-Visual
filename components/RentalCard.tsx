"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Eye, Star, Camera, Clock } from "lucide-react"
import BookingModal from "./booking-modal"
import ViewRentalItemModal from "./ViewRentalItemModal"

interface RentalItem {
  id: string
  name: string
  price: string
  image?: string // Old structure
  coverImage?: string // New structure
  images?: string[] // New structure
  description: string
}

interface RentalCardProps {
  item: RentalItem
}

export default function RentalCard({ item }: RentalCardProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)

  // Use coverImage if available, fallback to image for backward compatibility
  const displayImage = item.coverImage || item.image || "/placeholder.svg?height=400&width=600"
  const totalImages = (item.images?.length || 0) + 1 // +1 for cover image

  return (
    <>
      <Card className="w-full max-w-sm mx-auto bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-sm border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-500 group hover:shadow-2xl hover:shadow-cyan-400/10 overflow-hidden">
        <CardContent className="p-0">
          {/* Image Section */}
          <div className="relative overflow-hidden">
            <div className="aspect-[4/3] relative">
              <Image
                src={displayImage || "/placeholder.svg"}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Top Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge className="bg-cyan-500/90 text-white border-0 backdrop-blur-sm">
                  <Camera className="w-3 h-3 mr-1" />
                  Professional
                </Badge>
              </div>

              {/* Image Count Badge */}
              {totalImages > 1 && (
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-gray-600">
                  📸 {totalImages} photos
                </div>
              )}

              {/* Rating */}
              <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-white text-xs font-medium">4.9</span>
              </div>

              {/* Quick View Button */}
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsViewOpen(true)
                  }}
                  className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 hover:scale-105 transition-all duration-300"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Quick View
                </Button>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-4">
            {/* Title and Price */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2 leading-tight">
                {item.name}
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {item.price}
                  </span>
                  <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                    <Clock className="w-3 h-3 mr-1" />
                    /day
                  </Badge>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">{item.description}</p>

            {/* Features */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs bg-gray-700/50 text-gray-300 border-0">
                High Quality
              </Badge>
              <Badge variant="secondary" className="text-xs bg-gray-700/50 text-gray-300 border-0">
                Support Included
              </Badge>
              <Badge variant="secondary" className="text-xs bg-gray-700/50 text-gray-300 border-0">
                Flexible Terms
              </Badge>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsViewOpen(true)
                }}
                variant="outline"
                className="flex-1 border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-400/5 transition-all duration-300"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>

              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsBookingOpen(true)
                }}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-cyan-500/25"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <ViewRentalItemModal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} item={item} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  )
}
