"use client"

import { useState } from "react"
import { GameCard } from "./game-card"

const CARDS = [
  {
    title: "Own the Drift",
    subtitle: "BURN POINT",
    image: "/images/hero-drift.png",
  },
  {
    title: "Urban Warriors",
    subtitle: "TACTICAL ACTION",
    image: "/images/hero3.png",
  },
  {
    title: "Sniper Ops",
    subtitle: "TACTICAL",
    image: "/images/sniper.jpeg",
  },
]

// 1st bluish, 2nd orangish light, 3rd light greyish
const THEMES = [
  { accent: "#2B7BFF", fg: "#ffffff" }, // blue
  { accent: "#FF9A3D", fg: "#111111" }, // orange light
  { accent: "#C9CED8", fg: "#111111" }, // grey light
]

export default function GameCarousel() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const theme = THEMES[active] ?? THEMES[0]
  const card = CARDS[active]

  return (
    <div className="w-full max-w-[420px] mx-auto">
      <GameCard
        title={card.title}
        subtitle={card.subtitle}
        image={card.image}
        progress={{ active, total: CARDS.length }}
        paused={paused}
        onPauseToggle={() => setPaused((p) => !p)}
        accentColor={theme.accent}
        accentTextColor={theme.fg}
        pageBgColor="#000000"
      />

      {/* simple next/prev (optional) */}
      <div className="mt-4 flex justify-center gap-2">
        <button
          className="px-4 py-2 rounded-md bg-white/10 text-white"
          onClick={() => setActive((a) => (a + CARDS.length - 1) % CARDS.length)}
          type="button"
        >
          Prev
        </button>
        <button
          className="px-4 py-2 rounded-md bg-white/10 text-white"
          onClick={() => setActive((a) => (a + 1) % CARDS.length)}
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  )
}
