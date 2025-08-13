import Hero from "@/components/Hero"
import FeaturedRentals from "@/components/FeaturedRentals"
import CompanyDescription from "@/components/CompanyDescription"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900">
      <Hero />
      <CompanyDescription />
      <FeaturedRentals />
    </main>
  )
}
