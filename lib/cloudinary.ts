import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
})

export async function uploadToCloudinary(file: File, folder = "rental-items"): Promise<string> {
  try {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: folder,
            resource_type: "auto",
            transformation: [{ width: 800, height: 600, crop: "fill", quality: "auto" }],
          },
          (error, result) => {
            if (error) {
              reject(error)
            } else {
              resolve(result?.secure_url || "")
            }
          },
        )
        .end(buffer)
    })
  } catch (error) {
    throw new Error("Failed to upload image to Cloudinary")
  }
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error("Failed to delete image from Cloudinary:", error)
  }
}
