"use server"

import dbConnect from "@/lib/dbConnect"
import RentalItem from "@/models/RentalItem"
import { revalidatePath } from "next/cache"
import { uploadToCloudinary } from "@/lib/cloudinary"

export async function addRentalItem(prevState: any, formData: FormData) {
  try {
    await dbConnect()

    const name = formData.get("name") as string
    const price = formData.get("price") as string
    const description = formData.get("description") as string
    const coverImageFile = formData.get("coverImage") as File
    const additionalImages = formData.getAll("additionalImages") as File[]

    if (!name || !price || !description || !coverImageFile || coverImageFile.size === 0) {
      return { success: false, message: "All required fields must be filled." }
    }

    // Upload cover image
    const coverImageUrl = await uploadToCloudinary(coverImageFile, "rental-items/covers")

    // Upload additional images
    const additionalImageUrls: string[] = []
    for (const imageFile of additionalImages) {
      if (imageFile && imageFile.size > 0) {
        const imageUrl = await uploadToCloudinary(imageFile, "rental-items/gallery")
        additionalImageUrls.push(imageUrl)
      }
    }

    const newItem = new RentalItem({
      name,
      price,
      coverImage: coverImageUrl,
      images: additionalImageUrls,
      description,
    })

    await newItem.save()

    revalidatePath("/admin")
    revalidatePath("/rentals")
    revalidatePath("/")

    return { success: true, message: `Rental item "${name}" added successfully!` }
  } catch (error) {
    console.error("Error adding rental item:", error)
    return { success: false, message: "Failed to add rental item. Please try again." }
  }
}

export async function updateRentalItem(prevState: any, formData: FormData) {
  try {
    await dbConnect()

    const id = formData.get("id") as string
    const name = formData.get("name") as string
    const price = formData.get("price") as string
    const description = formData.get("description") as string
    const coverImageFile = formData.get("coverImage") as File
    const additionalImages = formData.getAll("additionalImages") as File[]

    if (!id || !name || !price || !description) {
      return { success: false, message: "All required fields must be filled." }
    }

    const existingItem = await RentalItem.findById(id)
    if (!existingItem) {
      return { success: false, message: "Rental item not found." }
    }

    let coverImageUrl = existingItem.coverImage || existingItem.image || ""
    const additionalImageUrls = [...(existingItem.images || [])]

    // Upload new cover image if provided
    if (coverImageFile && coverImageFile.size > 0) {
      coverImageUrl = await uploadToCloudinary(coverImageFile, "rental-items/covers")
    }

    // Upload new additional images if provided
    for (const imageFile of additionalImages) {
      if (imageFile && imageFile.size > 0) {
        const imageUrl = await uploadToCloudinary(imageFile, "rental-items/gallery")
        additionalImageUrls.push(imageUrl)
      }
    }

    const updatedItem = await RentalItem.findByIdAndUpdate(
      id,
      {
        name,
        price,
        coverImage: coverImageUrl,
        images: additionalImageUrls,
        description,
      },
      { new: true, runValidators: true },
    )

    revalidatePath("/admin")
    revalidatePath("/rentals")
    revalidatePath("/")

    return { success: true, message: `Rental item "${name}" updated successfully!` }
  } catch (error) {
    console.error("Error updating rental item:", error)
    return { success: false, message: "Failed to update rental item. Please try again." }
  }
}

export async function deleteRentalItem(id: string) {
  try {
    await dbConnect()

    if (!id) {
      return { success: false, message: "Item ID is required for deletion." }
    }

    const deletedItem = await RentalItem.findByIdAndDelete(id)

    if (!deletedItem) {
      return { success: false, message: "Rental item not found." }
    }

    revalidatePath("/admin")
    revalidatePath("/rentals")
    revalidatePath("/")

    return { success: true, message: `Rental item "${deletedItem.name}" deleted successfully!` }
  } catch (error) {
    console.error("Error deleting rental item:", error)
    return { success: false, message: "Failed to delete rental item. Please try again." }
  }
}
