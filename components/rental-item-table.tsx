"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PencilIcon, TrashIcon, Search, Eye } from "lucide-react"
import Image from "next/image"
import EditRentalItemModal from "./edit-rental-item-modal"
import DeleteRentalItemDialog from "./delete-rental-item-dialog"
import ViewRentalItemModal from "./view-rental-item-modal"

export default function RentalItemTable({ rentalItems }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialog, setIsDeleteDialog] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Filter items based on search term
  const filteredItems = useMemo(() => {
    if (!searchTerm) return rentalItems

    return rentalItems.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.price.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [rentalItems, searchTerm])

  const handleEditClick = (item) => {
    setSelectedItem(item)
    setIsEditModalOpen(true)
  }

  const handleDeleteClick = (item) => {
    setSelectedItem(item)
    setIsDeleteDialog(true)
  }

  const handleViewClick = (item) => {
    setSelectedItem(item)
    setIsViewModalOpen(true)
  }

  const handleModalClose = () => {
    setIsEditModalOpen(false)
    setIsDeleteDialog(false)
    setIsViewModalOpen(false)
    setSelectedItem(null)
  }

  return (
    <Card className="bg-gray-800 border-gray-700 p-6">
      <CardHeader>
        <CardTitle className="text-white text-2xl">Existing Rental Items</CardTitle>

        {/* Search Bar */}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search items by name, description, or price..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-700 border-gray-600 text-white"
          />
        </div>

        {/* Results count */}
        <p className="text-gray-400 text-sm mt-2">
          Showing {filteredItems.length} of {rentalItems.length} items
        </p>
      </CardHeader>

      <CardContent>
        {filteredItems.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-gray-700">
                  <TableHead className="text-gray-300">Cover Image</TableHead>
                  <TableHead className="text-gray-300">Name</TableHead>
                  <TableHead className="text-gray-300">Price</TableHead>
                  <TableHead className="text-gray-300">Description</TableHead>
                  <TableHead className="text-gray-300">Images</TableHead>
                  <TableHead className="text-gray-300 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => {
                  // Handle both old and new image structures
                  const displayImage = item.coverImage || item.image || "/placeholder.svg?height=50&width=50"
                  const additionalImagesCount = item.images?.length || 0

                  return (
                    <TableRow key={item._id} className="border-gray-700 hover:bg-gray-700">
                      <TableCell>
                        <Image
                          src={displayImage || "/placeholder.svg"}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium text-white">{item.name}</TableCell>
                      <TableCell className="text-gray-300">{item.price}</TableCell>
                      <TableCell className="text-gray-400 max-w-[200px] truncate">{item.description}</TableCell>
                      <TableCell className="text-gray-300">
                        {additionalImagesCount > 0 ? `${additionalImagesCount} additional` : "Cover only"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" onClick={() => handleViewClick(item)}>
                            <Eye className="h-4 w-4 text-gray-400" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => handleEditClick(item)}>
                            <PencilIcon className="h-4 w-4 text-gray-400" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="destructive" size="icon" onClick={() => handleDeleteClick(item)}>
                            <TrashIcon className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-center text-gray-400 text-lg py-8">
            {searchTerm ? `No items found matching "${searchTerm}"` : "No rental items available yet."}
          </p>
        )}
      </CardContent>

      {selectedItem && (
        <>
          <ViewRentalItemModal isOpen={isViewModalOpen} onClose={handleModalClose} item={selectedItem} />
          <EditRentalItemModal isOpen={isEditModalOpen} onClose={handleModalClose} item={selectedItem} />
          <DeleteRentalItemDialog isOpen={isDeleteDialog} onClose={handleModalClose} item={selectedItem} />
        </>
      )}
    </Card>
  )
}
