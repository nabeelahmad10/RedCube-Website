"use client"

import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type NewsItem = {
  id: string
  image: string
  tag: string
  title: string
  date: string
}

const INITIAL_NEWS: NewsItem[] = [
  {
    id: "n1",
    image: "/images/news1.png",
    tag: "ZERO HOUR CITY",
    title: "Fresh content update introduces enhanced combat mechanics and new missions.",
    date: "November 16, 2025",
  },
  {
    id: "n2",
    image: "/images/news2.png",
    tag: "BURN POINT",
    title: "New drift challenges and leaderboard events are now live for all players.",
    date: "November 20, 2025",
  },
  {
    id: "n3",
    image: "/images/news3.png",
    tag: "SKY RAIDERS",
    title: "Season rewards updated with new cosmetics and limited-time drops.",
    date: "November 28, 2025",
  },
]

type Pos = "left" | "center" | "right"

export function NewsPeekCarousel() {
  const [items, setItems] = useState<NewsItem[]>(INITIAL_NEWS)
  const [activeIndex, setActiveIndex] = useState(0)
  const [tapCount, setTapCount] = useState(0)

  // tap1/2 small fade pulse ONLY on center
  const [centerPulse, setCenterPulse] = useState(0)

  // tap3 cross animation phase
  const [swapPhase, setSwapPhase] = useState<null | "cross">(null)

  const lockRef = useRef(false)

  // ✅ measure stage width
  const stageRef = useRef<HTMLDivElement | null>(null)
  const [stageW, setStageW] = useState(0)

  useEffect(() => {
    if (!stageRef.current) return
    const el = stageRef.current

    const ro = new ResizeObserver(() => setStageW(el.clientWidth))
    ro.observe(el)
    setStageW(el.clientWidth)

    return () => ro.disconnect()
  }, [])

  const len = items.length
  const center = items[activeIndex]
  const left = items[(activeIndex - 1 + len) % len]
  const right = items[(activeIndex + 1) % len]

  // ---- LOOK CONTROLS (tune these only) ----
  const CARD_W_RATIO = 0.78
  const SIDE_SCALE = 0.88
  const GAP = 24 // gap between cards (the only visible black gap)
  const EDGE_FILL = 6 // ensures sides cover screen edges (no black line)
  // ----------------------------------------

  const cardW = stageW * CARD_W_RATIO
  const sideEffectiveW = cardW * SIDE_SCALE

  /**
   * We center-anchor all cards (left-1/2 + -translate-x-1/2)
   * So x=0 means centered.
   *
   * We want TWO constraints:
   * 1) A clear gap between side & center:
   *    SIDE_X >= (cardW*(1+SIDE_SCALE)/2 + GAP)
   *
   * 2) No black gap at outer edges:
   *    SIDE card should extend beyond container edge so it covers it:
   *    SIDE_X >= (stageW/2 - sideEffectiveW/2 + EDGE_FILL)
   */
  const neededForGap = cardW * (1 + SIDE_SCALE) / 2 + GAP
  const neededForEdgeFill = stageW ? stageW / 2 - sideEffectiveW / 2 + EDGE_FILL : 0

  const SIDE_X = stageW ? Math.max(neededForGap, neededForEdgeFill) : 230

  // ✅ base positions: edges covered, gap ONLY between cards
  const base = {
    left: { x: -SIDE_X, scale: SIDE_SCALE, opacity: 0.78, zIndex: 1 },
    center: { x: 0, scale: 1, opacity: 1, zIndex: 3 },
    right: { x: SIDE_X, scale: SIDE_SCALE, opacity: 0.78, zIndex: 1 },
  } as const

  // ✅ tap3: sides cross OVER the center
  const crossOverTop = {
    left: { x: SIDE_X, scale: 0.9, opacity: 0.95, zIndex: 6 },
    center: { x: 0, scale: 1, opacity: 1, zIndex: 3 },
    right: { x: -SIDE_X, scale: 0.9, opacity: 0.95, zIndex: 6 },
  } as const

  const variants = swapPhase === "cross" ? crossOverTop : base

  const cards = useMemo(
    () => [
      { item: left, pos: "left" as Pos },
      { item: center, pos: "center" as Pos },
      { item: right, pos: "right" as Pos },
    ],
    [left, center, right]
  )

  const handleTap = () => {
    if (lockRef.current) return
    lockRef.current = true

    const nextTap = tapCount + 1

    // Tap 1/2
    if (nextTap === 1 || nextTap === 2) {
      setCenterPulse((p) => p + 1)
      setActiveIndex((p) => (p + 1) % len)
      setTapCount(nextTap)
      setTimeout(() => (lockRef.current = false), 360)
      return
    }

    // Tap 3
    if (nextTap === 3) {
      setSwapPhase("cross")

      setTimeout(() => {
        setItems((prev) => {
          const copy = [...prev]
          ;[copy[0], copy[2]] = [copy[2], copy[0]]
          return copy
        })

        setActiveIndex(0)
        setTapCount(0)
        setSwapPhase(null)
        lockRef.current = false
      }, 420)

      return
    }

    lockRef.current = false
  }

  return (
    <section className="w-full px-4 pb-10">
      <div className="mx-auto w-full max-w-[420px]">
        <button
          onClick={handleTap}
          className="relative w-full h-[560px] outline-none"
          aria-label="Tap to change news"
          type="button"
        >
          {/* overflow-hidden clips the outside parts of side cards,
              but because SIDE_X ensures they extend past edges,
              there will be NO black gap at left/right edges */}
          <div
            ref={stageRef}
            className="absolute inset-0 overflow-hidden rounded-[32px] bg-black"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence initial={false}>
                {cards.map(({ item, pos }) => {
                  const isCenter = pos === "center"

                  return (
                    <motion.div
                      key={item.id}
                      className="absolute left-1/2 top-1/2 h-[92%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-[30px] overflow-hidden"
                      initial={variants[pos]}
                      animate={variants[pos]}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: swapPhase === "cross" ? 0.42 : 0.36,
                        ease: [0.2, 0.9, 0.2, 1],
                      }}
                      style={{ zIndex: variants[pos].zIndex as number }}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          priority={isCenter}
                        />

                        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

                        {/* tap1/2 pulse only on center */}
                        {isCenter && swapPhase !== "cross" && (
                          <motion.div
                            key={`pulse-${centerPulse}`}
                            className="absolute inset-0"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: [1, 0.82, 1] }}
                            transition={{ duration: 0.22, ease: "easeOut" }}
                            style={{ pointerEvents: "none" }}
                          />
                        )}

                        {/* center overlay only */}
                        {isCenter && (
                          <div className="absolute left-4 right-4 bottom-6 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl p-4 text-left shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
                            <p className="text-[10px] tracking-widest text-white/70">
                              {item.tag}
                            </p>
                            <p className="mt-2 text-[16px] font-semibold leading-snug text-white">
                              {item.title}
                            </p>
                            <p className="mt-3 text-[11px] text-white/55">{item.date}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>
        </button>

        <div className="mt-4 flex justify-center gap-2">
          {items.map((_, i) => (
            <span
              key={i}
              className={[
                "h-1.5 rounded-full transition-all",
                i === activeIndex ? "w-6 bg-white/80" : "w-2 bg-white/30",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
