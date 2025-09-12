import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src="/images/background-lines.png" alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Logo */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2">
        <Image src="/images/ranga-logo-main.png" alt="Ranga Visual Logo" width={300} height={120} />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 mt-20">
        <h1 className="text-6xl md:text-8xl font-bold mb-6">
          <span className="text-white">Ranga</span> <span className="text-cyan-400">Visuals</span>
        </h1>
        <p className="text-2xl md:text-3xl text-gray-200 mb-8 font-light">Capture, Create, Rent</p>
        <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Professional visual equipment and props for your creative projects. High-quality gear, competitive prices,
          seamless booking.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/rentals">
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105">
              Browse Rentals
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              variant="outline"
              className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-navy-900 font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 bg-transparent"
            >
              Get Quote
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
