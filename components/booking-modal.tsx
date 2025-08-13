"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { X, Plus, Minus } from "lucide-react"
import { createBooking } from "@/lib/actions"

const BookingModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    clientName: "",
    phone: "",
    email: "",
    paymentAmount: "",
    workLocation: "",
    pickupDate: "",
    pickupTime: "",
    returnDate: "",
    returnTime: "",
  })

  const [equipmentItems, setEquipmentItems] = useState([{ item: "", quantity: 1 }])
  const [isPending, setIsPending] = useState(false)
  const [state, setState] = useState(null)

  const updateEquipmentItem = (index, field, value) => {
    const updated = equipmentItems.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    setEquipmentItems(updated)
  }

  const addEquipmentRow = () => {
    setEquipmentItems([...equipmentItems, { item: "", quantity: 1 }])
  }

  const removeEquipmentRow = (index) => {
    const updated = equipmentItems.filter((_, i) => i !== index)
    setEquipmentItems(updated)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsPending(true)
    setState(null)

    try {
      // Create FormData object
      const formDataObj = new FormData()

      // Add basic form data
      formDataObj.append("clientName", formData.clientName)
      formDataObj.append("phone", formData.phone)
      formDataObj.append("email", formData.email)
      formDataObj.append("paymentAmount", formData.paymentAmount)
      formDataObj.append("workLocation", formData.workLocation)
      formDataObj.append("pickupDate", formData.pickupDate)
      formDataObj.append("pickupTime", formData.pickupTime)
      formDataObj.append("returnDate", formData.returnDate)
      formDataObj.append("returnTime", formData.returnTime)

      // Add equipment items
      equipmentItems.forEach((item, index) => {
        formDataObj.append(`equipment[${index}].item`, item.item)
        formDataObj.append(`equipment[${index}].quantity`, item.quantity.toString())
      })

      console.log("📤 Submitting booking form...")

      // Call server action
      const result = await createBooking(formDataObj)

      console.log("📥 Server response:", result)

      setState(result)

      if (result.success) {
        // Reset form on success
        setFormData({
          clientName: "",
          phone: "",
          email: "",
          paymentAmount: "",
          workLocation: "",
          pickupDate: "",
          pickupTime: "",
          returnDate: "",
          returnTime: "",
        })
        setEquipmentItems([{ item: "", quantity: 1 }])

        // Close modal after 2 seconds
        setTimeout(() => {
          onClose()
        }, 2000)
      }
    } catch (error) {
      console.error("❌ Form submission error:", error)
      setState({
        success: false,
        message: `Submission failed: ${error.message || "Unknown error"}`,
      })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center justify-between">
            AMASEZERANO - Equipment Rental Agreement
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <DialogDescription className="text-gray-400">Between RANGA Visuals and Client</DialogDescription>
        </DialogHeader>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Client Information */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Client Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="clientName" className="text-white">
                  Full Name *
                </Label>
                <Input
                  id="clientName"
                  name="clientName"
                  required
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-white">
                  Phone *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-white">
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
          </div>

          {/* Equipment Section */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Equipment Rental</h3>
              <Button type="button" onClick={addEquipmentRow} className="bg-cyan-600 hover:bg-cyan-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
            <div className="space-y-3">
              {equipmentItems.map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                  <div>
                    <Label className="text-white">Item {index + 1}</Label>
                    <Input
                      name={`equipment[${index}].item`}
                      value={item.item}
                      onChange={(e) => updateEquipmentItem(index, "item", e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="Equipment name"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Quantity</Label>
                    <Input
                      name={`equipment[${index}].quantity`}
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateEquipmentItem(index, "quantity", Number.parseInt(e.target.value) || 1)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    {equipmentItems.length > 1 && (
                      <Button type="button" variant="destructive" size="sm" onClick={() => removeEquipmentRow(index)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rental Details */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Rental Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="paymentAmount" className="text-white">
                  Payment Amount (RWF) *
                </Label>
                <Input
                  id="paymentAmount"
                  name="paymentAmount"
                  required
                  value={formData.paymentAmount}
                  onChange={(e) => setFormData({ ...formData, paymentAmount: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Amount in RWF"
                />
              </div>
              <div>
                <Label htmlFor="workLocation" className="text-white">
                  Work Location *
                </Label>
                <Input
                  id="workLocation"
                  name="workLocation"
                  required
                  value={formData.workLocation}
                  onChange={(e) => setFormData({ ...formData, workLocation: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Where will you use the equipment"
                />
              </div>
              <div>
                <Label htmlFor="pickupDate" className="text-white">
                  Pickup Date *
                </Label>
                <Input
                  id="pickupDate"
                  name="pickupDate"
                  type="date"
                  required
                  value={formData.pickupDate}
                  onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="pickupTime" className="text-white">
                  Pickup Time *
                </Label>
                <Input
                  id="pickupTime"
                  name="pickupTime"
                  type="time"
                  required
                  value={formData.pickupTime}
                  onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="returnDate" className="text-white">
                  Return Date *
                </Label>
                <Input
                  id="returnDate"
                  name="returnDate"
                  type="date"
                  required
                  value={formData.returnDate}
                  onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="returnTime" className="text-white">
                  Return Time *
                </Label>
                <Input
                  id="returnTime"
                  name="returnTime"
                  type="time"
                  required
                  value={formData.returnTime}
                  onChange={(e) => setFormData({ ...formData, returnTime: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-cyan-900/20 border border-cyan-600 p-4 rounded-lg">
            <h4 className="text-cyan-400 font-semibold mb-2">Payment Instructions</h4>
            <p className="text-gray-300 text-sm">
              Payment via MoMoPay:{" "}
              <span className="font-mono bg-gray-800 px-2 py-1 rounded">*182*8*1*997006*Amount#</span>
              <br />
              Pay to: Patrick | Contact: +250 786 008 625, +250 783 897 631
            </p>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-600 text-gray-300 bg-transparent"
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="bg-cyan-600 hover:bg-cyan-700">
              {isPending ? "Sending Request..." : "Send Rental Request"}
            </Button>
          </div>

          {/* Status Messages */}
          {state?.success && (
            <div className="bg-green-900/20 border border-green-600 p-4 rounded-lg">
              <p className="text-green-400 font-semibold">✅ Success!</p>
              <p className="text-green-300 text-sm">{state.message}</p>
              {state.emailId && <p className="text-green-200 text-xs mt-1">Email ID: {state.emailId}</p>}
            </div>
          )}

          {state?.success === false && (
            <div className="bg-red-900/20 border border-red-600 p-4 rounded-lg">
              <p className="text-red-400 font-semibold">❌ Error</p>
              <p className="text-red-300 text-sm">{state.message}</p>
              {state.error && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-red-200 text-xs">Error Details</summary>
                  <pre className="text-red-100 text-xs mt-1 overflow-auto bg-red-900/10 p-2 rounded">{state.error}</pre>
                </details>
              )}
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default BookingModal
