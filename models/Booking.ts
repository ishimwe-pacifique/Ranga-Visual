import mongoose, { Schema, type Document } from "mongoose"

export interface IBooking extends Document {
  clientName: string
  phone: string
  email: string
  equipment: Array<{
    item: string
    quantity: number
  }>
  paymentAmount: string
  pickupDate: string
  pickupTime: string
  returnDate: string
  returnTime: string
  workLocation: string
  createdAt: Date
}

const BookingSchema: Schema = new Schema(
  {
    clientName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    equipment: [
      {
        item: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    paymentAmount: { type: String, required: true },
    pickupDate: { type: String, required: true },
    pickupTime: { type: String, required: true },
    returnDate: { type: String, required: true },
    returnTime: { type: String, required: true },
    workLocation: { type: String, required: true },
  },
  { timestamps: true },
)

export default mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema)
