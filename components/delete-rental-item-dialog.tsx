"use client"

import { useState, useEffect } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deleteRentalItem } from "@/app/admin/actions" // Import the delete action

export default function DeleteRentalItemDialog({ isOpen, onClose, item }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [state, setState] = useState(null)

  useEffect(() => {
    if (state?.success) {
      console.log(state.message)
      onClose() // Close dialog on success
    } else if (state?.success === false) {
      console.error(state.message)
    }
  }, [state, onClose])

  const handleDelete = async () => {
    setIsDeleting(true)
    setState(null)
    const result = await deleteRentalItem(item._id)
    setState(result)
    setIsDeleting(false)
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-gray-900 border-gray-700 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            This action cannot be undone. This will permanently delete the rental item "
            <span className="font-semibold text-white">{item?.name}</span>" from your database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700 hover:text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
        {state?.success && <p className="text-green-500 mt-4 text-center">{state.message}</p>}
        {state?.success === false && <p className="text-red-500 mt-4 text-center">{state.message}</p>}
      </AlertDialogContent>
    </AlertDialog>
  )
}
