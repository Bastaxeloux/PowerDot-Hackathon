"use client"

import { BatteryCharging, BarChart3, Info, Menu } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
            <BatteryCharging className="h-6 w-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold gradient-text">Power Dot</span>
            <p className="text-xs text-gray-500">Hackathon 2024</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          <Button variant="ghost" size="sm" asChild className="rounded-full">
            <Link href="/" className="flex items-center space-x-1">
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild className="rounded-full">
            <Link href="#" className="flex items-center space-x-1">
              <Info className="h-4 w-4" />
              <span>À propos</span>
            </Link>
          </Button>
          <Button size="sm" className="rounded-full ml-2">
            <Link href="#">Méthodologie</Link>
          </Button>
        </nav>

        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="rounded-full">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden p-4 glass-effect border-b border-gray-200 animate-in slide-in-from-top">
          <div className="flex flex-col space-y-2">
            <Button variant="ghost" size="sm" asChild className="justify-start">
              <Link href="/" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="justify-start">
              <Link href="#" className="flex items-center space-x-2">
                <Info className="h-4 w-4" />
                <span>À propos</span>
              </Link>
            </Button>
            <Button size="sm" className="mt-2">
              <Link href="#">Méthodologie</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

