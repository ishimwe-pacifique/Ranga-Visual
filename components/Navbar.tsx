"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-black/90 backdrop-blur-sm fixed w-full z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/images/ranga-logo-main.png" alt="Ranga Visual Logo" width={100} height={50} />
            <span className="text-2xl font-bold text-white">Ranga Visuals</span>
          </Link>

          <div className="hidden md:flex flex-grow justify-center">
            <div className="flex items-baseline space-x-8">
              <Link href="/" className="text-white hover:text-cyan-400 transition-colors">
                Home
              </Link>
              <Link href="/rentals" className="text-white hover:text-cyan-400 transition-colors">
                Rentals
              </Link>
              <Link href="/about" className="text-white hover:text-cyan-400 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-white hover:text-cyan-400 transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-cyan-400">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 text-white hover:text-cyan-400">
              Home
            </Link>
            <Link href="/rentals" className="block px-3 py-2 text-white hover:text-cyan-400">
              Rentals
            </Link>
            <Link href="/about" className="block px-3 py-2 text-white hover:text-cyan-400">
              About
            </Link>
            <Link href="/contact" className="block px-3 py-2 text-white hover:text-cyan-400">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
