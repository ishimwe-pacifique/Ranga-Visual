import dbConnect from "@/lib/dbConnect"
import RentalItem from "@/models/RentalItem"
import type { IRentalItem } from "@/models/RentalItem"
import RentalItemTable from "@/components/rental-item-table"
import AddRentalItemForm from "@/components/add-rental-item-form"
import AdminHeader from "@/components/admin-header"

export default async function AdminPage() {
  try {
    // Fetch all rental items on the server
    await dbConnect()
    const allRentals: IRentalItem[] = await RentalItem.find({}).lean()

    // Serialize the data properly to avoid hydration issues
    const serializedRentals = allRentals.map((item) => ({
      _id: item._id.toString(),
      name: item.name,
      price: item.price,
      image: item.image || "", // Old structure
      coverImage: item.coverImage || "", // New structure
      images: item.images || [], // New structure
      description: item.description,
      createdAt: item.createdAt?.toISOString(),
      updatedAt: item.updatedAt?.toISOString(),
    }))

    return (
      <main className="min-h-screen bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Admin Header with Logout */}
          <AdminHeader />

          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">Admin Panel</h1>
            <p className="text-xl text-gray-400">Manage Rental Items</p>
          </div>

          {/* Add New Rental Item Form */}
          <AddRentalItemForm />

          {/* Existing Rental Items Table */}
          <div className="mt-12">
            <RentalItemTable rentalItems={serializedRentals} />
          </div>
        </div>
      </main>
    )
  } catch (error) {
    console.error("Error in AdminPage:", error)
    return (
      <main className="min-h-screen bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <AdminHeader />
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-4">Admin Panel</h1>
            <p className="text-xl text-red-400">Error loading admin panel. Please try again.</p>
          </div>
        </div>
      </main>
    )
  }
}
