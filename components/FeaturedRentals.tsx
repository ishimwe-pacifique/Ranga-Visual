import RentalCard from "./RentalCard"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import dbConnect from "@/lib/dbConnect"
import RentalItem from "@/models/RentalItem"
import type { IRentalItem } from "@/models/RentalItem"

export default async function FeaturedRentals() {
  await dbConnect()
  // Fetch a limited number of featured items, e.g., 3 for better layout
  const featuredItems: IRentalItem[] = await RentalItem.find({}).limit(3).lean()

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Featured Rentals</h2>
          <p className="text-xl text-gray-400">Popular equipment ready for your next project</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems.length > 0 ? (
            featuredItems.map((item) => (
              <RentalCard
                key={item._id.toString()}
                item={{
                  id: item._id.toString(),
                  name: item.name,
                  price: item.price,
                  image: item.image, // Old structure
                  coverImage: item.coverImage, // New structure
                  images: item.images, // New structure
                  description: item.description,
                }}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400 text-lg">No featured items available yet.</p>
          )}
        </div>

        <div className="text-center mt-12">
          <Link href="/rentals">
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105">
              View All Rentals
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
