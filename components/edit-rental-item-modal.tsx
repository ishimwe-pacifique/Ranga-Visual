"use client"

import { useState, useEffect } from "react"
import { useActionState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Upload, ImageIcon } from "lucide-react"
import Image from "next/image"
import { updateRentalItem } from "@/app/admin/actions"

export default function EditRentalItemModal({ isOpen, onClose, item }) {
  const [state, formAction, isPending] = useActionState(updateRentalItem, null)
  const [formData, setFormData] = useState({
    id: item?._id || "",
    name: item?.name || "",
    price: item?.price || "",
    description: item?.description || "",
  })

  const [coverImagePreview, setCoverImagePreview] = useState("")
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState([])
  const [existingImages, setExistingImages] = useState([])

  useEffect(() => {
    if (item) {
      setFormData({
        id: item._id || "",
        name: item.name || "",
        price: item.price || "",
        description: item.description || "",
      })

      // Handle both old and new image structures
      const coverImg = item.coverImage || item.image || ""
      setCoverImagePreview(coverImg)

      const additionalImgs = item.images || []
      setExistingImages(additionalImgs)
      setAdditionalImagePreviews([])
    }
  }, [item])

  useEffect(() => {
    if (state?.success) {
      console.log(state.message)
      onClose() // Close modal on success
      // Reset form
      setCoverImagePreview("")
      setAdditionalImagePreviews([])
      setExistingImages([])
    } else if (state?.success === false) {
      console.error(state.message)
    }
  }, [state, onClose])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCoverImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setCoverImagePreview(e.target?.result)
      reader.readAsDataURL(file)
    }
  }

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files || [])
    const newPreviews = []

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        newPreviews.push(e.target?.result)
        if (newPreviews.length === files.length) {
          setAdditionalImagePreviews((prev) => [...prev, ...newPreviews])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const removeAdditionalImage = (index) => {
    setAdditionalImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900/98 to-black/98 backdrop-blur-xl border border-gray-700/50 text-white">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
                <ImageIcon className="h-6 w-6 text-cyan-400" />
                Edit Rental Item
              </DialogTitle>
              <DialogDescription className="text-gray-400 mt-1">
                Update the rental item details and images. All changes will be saved automatically.
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <form action={formAction} className="space-y-6 mt-6">
          <input type="hidden" name="id" value={formData.id} />

          {/* Basic Information */}
          <div className="bg-gray-800/50 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name" className="text-white font-medium">
                  Item Name *
                </Label>
                <Input
                  id="edit-name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-700 border-gray-600 text-white mt-1 focus:border-cyan-400"
                  placeholder="e.g., Professional DSLR Camera Kit"
                />
              </div>

              <div>
                <Label htmlFor="edit-price" className="text-white font-medium">
                  Price *
                </Label>
                <Input
                  id="edit-price"
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  className="bg-gray-700 border-gray-600 text-white mt-1 focus:border-cyan-400"
                  placeholder="e.g., 15,000 RWF/day"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-description" className="text-white font-medium">
                Description *
              </Label>
              <Textarea
                id="edit-description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                className="bg-gray-700 border-gray-600 text-white min-h-[120px] mt-1 focus:border-cyan-400"
                placeholder="Detailed description of the equipment..."
              />
            </div>
          </div>

          {/* Cover Image Section */}
          <div className="bg-gray-800/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Cover Image</h3>

            {/* Current Cover Image */}
            {coverImagePreview && (
              <div className="mb-4">
                <Label className="text-gray-300 text-sm">Current Cover Image</Label>
                <div className="mt-2 relative w-full max-w-md">
                  <Image
                    src={coverImagePreview || "/placeholder.svg"}
                    alt="Cover preview"
                    width={400}
                    height={300}
                    className="rounded-lg object-cover border border-gray-600"
                  />
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="edit-coverImage" className="text-white font-medium">
                Upload New Cover Image (Optional)
              </Label>
              <Input
                id="edit-coverImage"
                name="coverImage"
                type="file"
                accept="image/*"
                onChange={handleCoverImageChange}
                className="bg-gray-700 border-gray-600 text-white mt-1 file:bg-cyan-600 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4"
              />
              <p className="text-gray-400 text-sm mt-1">Leave empty to keep current cover image</p>
            </div>
          </div>

          {/* Additional Images Section */}
          <div className="bg-gray-800/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Additional Images</h3>

            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div className="mb-6">
                <Label className="text-gray-300 text-sm">Current Additional Images</Label>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {existingImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Existing image ${index + 1}`}
                        width={150}
                        height={100}
                        className="rounded-lg object-cover border border-gray-600"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeExistingImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Additional Images */}
            {additionalImagePreviews.length > 0 && (
              <div className="mb-4">
                <Label className="text-gray-300 text-sm">New Images to Add</Label>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {additionalImagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={preview || "/placeholder.svg"}
                        alt={`New image ${index + 1}`}
                        width={150}
                        height={100}
                        className="rounded-lg object-cover border border-gray-600"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeAdditionalImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      <Badge className="absolute bottom-1 left-1 bg-green-500/80 text-white text-xs">New</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="edit-additionalImages" className="text-white font-medium">
                Add More Images (Optional)
              </Label>
              <Input
                id="edit-additionalImages"
                name="additionalImages"
                type="file"
                accept="image/*"
                multiple
                onChange={handleAdditionalImagesChange}
                className="bg-gray-700 border-gray-600 text-white mt-1 file:bg-cyan-600 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4"
              />
              <p className="text-gray-400 text-sm mt-1">Select multiple images to add to the gallery</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4 border-t border-gray-700/50">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
              className="border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-6 transition-all duration-300"
            >
              {isPending ? (
                <>
                  <Upload className="h-4 w-4 mr-2 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>

          {/* Status Messages */}
          {state?.success && (
            <div className="bg-green-900/20 border border-green-600 p-4 rounded-lg">
              <p className="text-green-400 font-semibold">✅ Success!</p>
              <p className="text-green-300 text-sm">{state.message}</p>
            </div>
          )}

          {state?.success === false && (
            <div className="bg-red-900/20 border border-red-600 p-4 rounded-lg">
              <p className="text-red-400 font-semibold">❌ Error</p>
              <p className="text-red-300 text-sm">{state.message}</p>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
