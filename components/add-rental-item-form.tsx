"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"
import Image from "next/image"
import { addRentalItem } from "@/app/admin/actions"

export default function AddRentalItemForm() {
  const [state, formAction, isPending] = useActionState(addRentalItem, null)
  const [formKey, setFormKey] = useState(0)
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null)
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState<string[]>([])

  useEffect(() => {
    if (state?.success) {
      setFormKey((prevKey) => prevKey + 1)
      setCoverImagePreview(null)
      setAdditionalImagePreviews([])
    }
  }, [state])

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setCoverImagePreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newPreviews: string[] = []

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        newPreviews.push(e.target?.result as string)
        if (newPreviews.length === files.length) {
          setAdditionalImagePreviews((prev) => [...prev, ...newPreviews])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const removeAdditionalImage = (index: number) => {
    setAdditionalImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <Card className="bg-gray-800 border-gray-700 p-6 mb-12">
      <CardHeader>
        <CardTitle className="text-white text-2xl">Add New Rental Item</CardTitle>
      </CardHeader>
      <CardContent>
        <form key={formKey} action={formAction} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-white">
              Item Name *
            </Label>
            <Input
              id="name"
              name="name"
              required
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="e.g., Professional DSLR Camera Kit"
            />
          </div>

          <div>
            <Label htmlFor="price" className="text-white">
              Price (e.g., 15,000 RWF/day) *
            </Label>
            <Input
              id="price"
              name="price"
              required
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="e.g., 15,000 RWF/day"
            />
          </div>

          {/* Cover Image Upload */}
          <div>
            <Label htmlFor="coverImage" className="text-white">
              Cover Image *
            </Label>
            <div className="mt-2">
              <Input
                id="coverImage"
                name="coverImage"
                type="file"
                accept="image/*"
                required
                onChange={handleCoverImageChange}
                className="bg-gray-700 border-gray-600 text-white file:bg-cyan-600 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4"
              />
              {coverImagePreview && (
                <div className="mt-4">
                  <Image
                    src={coverImagePreview || "/placeholder.svg"}
                    alt="Cover preview"
                    width={200}
                    height={150}
                    className="rounded-md object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Additional Images Upload */}
          <div>
            <Label htmlFor="additionalImages" className="text-white">
              Additional Images (Optional)
            </Label>
            <div className="mt-2">
              <Input
                id="additionalImages"
                name="additionalImages"
                type="file"
                accept="image/*"
                multiple
                onChange={handleAdditionalImagesChange}
                className="bg-gray-700 border-gray-600 text-white file:bg-cyan-600 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4"
              />
              {additionalImagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {additionalImagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={preview || "/placeholder.svg"}
                        alt={`Additional preview ${index + 1}`}
                        width={150}
                        height={100}
                        className="rounded-md object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6"
                        onClick={() => removeAdditionalImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-white">
              Description *
            </Label>
            <Textarea
              id="description"
              name="description"
              required
              className="bg-gray-700 border-gray-600 text-white min-h-[100px]"
              placeholder="Detailed description of the item"
            />
          </div>

          <Button type="submit" disabled={isPending} className="bg-cyan-600 hover:bg-cyan-700 w-full">
            {isPending ? "Adding Item..." : "Add Item"}
          </Button>

          {state?.success && <p className="text-green-500 mt-4 text-center">{state.message}</p>}
          {state?.success === false && <p className="text-red-500 mt-4 text-center">{state.message}</p>}
        </form>
      </CardContent>
    </Card>
  )
}
