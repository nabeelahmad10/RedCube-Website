"use client"

import { useEffect, useMemo, useState } from "react"
import { GameCard } from "@/components/game-card"

type Slide = {
  title: string
  subtitle: string
  image: string
  logo?: string
}

const SLIDES: Slide[] = [
  {
    title: "Own the Drift",
    subtitle: "BURN POINT",
    image: "/images/hero-drift.png",
    logo: "/images/burn-point-logo.png",
  },
  {
    title: "Urban Warriors",
    subtitle: "TACTICAL ACTION",
    image: "/images/hero3.png",
  },
  {
    title: "Shadow Operations",
    subtitle: "STEALTH SHOOTER",
    image: "/images/sniper.jpeg",
  },
]

// 1st bluish, 2nd orangish light, 3rd light greyish
const THEMES = [
  { accent: "#2B7BFF", fg: "#ffffff" }, // blue
  { accent: "#FF9A3D", fg: "#111111" }, // orange light
  { accent: "#C9CED8", fg: "#111111" }, // grey light
]

export function HeroRotator() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const total = SLIDES.length
  const slide = SLIDES[active]
  const theme = THEMES[active] ?? THEMES[0]

  // Auto-rotate every 4 seconds (change if you want)
  useEffect(() => {
    if (paused) return

    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % total)
    }, 4000)

    return () => window.clearInterval(id)
  }, [paused, total])

  // Optional: click progress bars to jump (if you add it later)
  // For now, just rotation + pause works.

  return (
    <GameCard
      title={slide.title}
      subtitle={slide.subtitle}
      image={slide.image}
      logo={slide.logo}
      showButtons
      progress={{ active, total }}
      paused={paused}
      onPauseToggle={() => setPaused((p) => !p)}
      accentColor={theme.accent}
      accentTextColor={theme.fg}
      pageBgColor="#000000"
    />
  )
}
