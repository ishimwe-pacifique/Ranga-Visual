import RentalCard from "@/components/RentalCard"
import dbConnect from "@/lib/dbConnect"
import RentalItem from "@/models/RentalItem"
import type { IRentalItem } from "@/models/RentalItem"

export default async function RentalsPage() {
  await dbConnect()
  const allRentals: IRentalItem[] = await RentalItem.find({}).lean()

  return (
    <main className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Equipment Rentals</h1>
          <p className="text-xl text-gray-400">Professional gear for every creative project</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allRentals.length > 0 ? (
            allRentals.map((item) => (
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
            <p className="col-span-full text-center text-gray-400 text-lg">
              No rental items available yet. Please add some from the admin panel!
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
