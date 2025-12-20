"use client"

import { useEffect, useState } from "react"
import { Menu, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const TEXT = "WELCOME TO REDCUBE STUDIOS!"
const AUTO_RETURN_MS = 5000

function useTypewriter(text: string, active: boolean, speed = 45) {
  const [value, setValue] = useState("")

  useEffect(() => {
    if (!active) {
      setValue("")
      return
    }

    let i = 0
    const id = setInterval(() => {
      i++
      setValue(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)

    return () => clearInterval(id)
  }, [text, active, speed])

  return value
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // ✅ AUTO RETURN AFTER 5s
  useEffect(() => {
    if (!collapsed) return

    const timer = setTimeout(() => {
      setCollapsed(false)
    }, AUTO_RETURN_MS)

    return () => clearTimeout(timer)
  }, [collapsed])

  const typed = useTypewriter(TEXT, collapsed)

  return (
    <nav className="fixed top-4 left-4 right-4 z-50">
      <div className="relative h-[44px]">
        {/* NAVBAR */}
        <div
          className={cn(
            "absolute inset-0 rounded-full transition-all duration-700",
            "before:content-[''] before:absolute before:inset-0 before:bg-linear-to-b before:from-white/8 before:to-transparent before:pointer-events-none",
            scrolled
              ? "bg-black/30 backdrop-blur-md border border-white/10 shadow-md"
              : "bg-black/20 backdrop-blur-md border border-white/10 shadow-sm",
            collapsed ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100",
          )}
        >
          <div className="px-4 h-full flex items-center justify-between">
            <button
              onClick={() => setCollapsed(true)}
              className="flex items-center text-white/80 hover:text-white"
              aria-label="Close navbar"
            >
              <ChevronRight className="w-5 h-5" />
              <ChevronRight className="w-5 h-5 -ml-4" />
            </button>

            <img src="/images/logo-cube.png" alt="Red Cube Logo" className="w-6 h-6" />

            <Menu className="w-6 h-6 text-white/80" />
          </div>
        </div>

        {/* TYPEWRITER TEXT */}
        <div
          className={cn(
            "absolute inset-0 rounded-full flex items-center justify-center transition-all duration-700",
            "bg-black/20 backdrop-blur-md border border-white/10",
            collapsed ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none",
          )}
        >
          <span className="text-white tracking-[0.3em] text-[11px] sm:text-[12px] font-medium">
            {typed}
            {typed.length < TEXT.length && <span className="ml-1 animate-pulse">|</span>}
          </span>
        </div>
      </div>
    </nav>
  )
}
