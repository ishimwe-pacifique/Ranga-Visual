import mongoose, { Schema, type Document } from "mongoose"

export interface IRentalItem extends Document {
  name: string
  price: string // e.g., "15,000 RWF/day"
  coverImage: string // Main cover image URL
  images: string[] // Array of additional image URLs
  description: string
  createdAt: Date
  updatedAt: Date
}

const RentalItemSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    coverImage: { type: String, required: true }, // Main cover image
    images: [{ type: String }], // Array of additional images
    description: { type: String, required: true },
  },
  { timestamps: true },
)

export default mongoose.models.RentalItem || mongoose.model<IRentalItem>("RentalItem", RentalItemSchema)
