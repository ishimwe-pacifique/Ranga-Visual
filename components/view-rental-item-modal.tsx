// "use client"

// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { ChevronLeft, ChevronRight } from "lucide-react"
// import Image from "next/image"
// import { useState } from "react"

// export default function ViewRentalItemModal({ isOpen, onClose, item }) {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)

//   if (!item) return null

//   const allImages = [item.coverImage || item.image, ...(item.images || [])].filter(Boolean)

//   const nextImage = () => {
//     setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
//   }

//   const prevImage = () => {
//     setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-4xl bg-gray-900 border-gray-700 text-white">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold">{item.name}</DialogTitle>
//         </DialogHeader>

//         <div className="space-y-6">
//           {/* Image Gallery */}
//           <div className="relative">
//             <div className="aspect-video relative bg-gray-800 rounded-lg overflow-hidden">
//               <Image
//                 src={allImages[currentImageIndex] || "/placeholder.svg"}
//                 alt={`${item.name} - Image ${currentImageIndex + 1}`}
//                 fill
//                 className="object-cover"
//               />

//               {allImages.length > 1 && (
//                 <>
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 border-gray-600"
//                     onClick={prevImage}
//                   >
//                     <ChevronLeft className="h-4 w-4" />
//                   </Button>
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 border-gray-600"
//                     onClick={nextImage}
//                   >
//                     <ChevronRight className="h-4 w-4" />
//                   </Button>
//                 </>
//               )}
//             </div>

//             {allImages.length > 1 && (
//               <div className="flex justify-center mt-4 space-x-2">
//                 {allImages.map((_, index) => (
//                   <button
//                     key={index}
//                     className={`w-3 h-3 rounded-full ${index === currentImageIndex ? "bg-cyan-600" : "bg-gray-600"}`}
//                     onClick={() => setCurrentImageIndex(index)}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Item Details */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <h3 className="text-lg font-semibold text-white mb-2">Price</h3>
//               <p className="text-cyan-400 text-xl font-bold">{item.price}</p>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold text-white mb-2">Total Images</h3>
//               <p className="text-gray-300">
//                 {allImages.length} image{allImages.length !== 1 ? "s" : ""}
//               </p>
//             </div>
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
//             <p className="text-gray-300 leading-relaxed">{item.description}</p>
//           </div>

//           <div className="flex justify-end">
//             <Button onClick={onClose} className="bg-cyan-600 hover:bg-cyan-700">
//               Close
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }
