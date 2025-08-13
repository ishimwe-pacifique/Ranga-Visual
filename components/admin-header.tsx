"use client"

import { Button } from "@/components/ui/button"
import { LogOut, Shield, User } from "lucide-react"
import { logout } from "@/lib/auth-actions"

export default function AdminHeader() {
  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-white font-semibold">Admin Dashboard</h2>
            <p className="text-gray-400 text-sm">Logged in as administrator</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-gray-300">
            <User className="h-4 w-4" />
            <span className="text-sm">admin@gmail.com</span>
          </div>

          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:border-red-400 hover:text-red-400 hover:bg-red-400/5 transition-all duration-300 bg-transparent"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
