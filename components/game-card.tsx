import React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Play } from "lucide-react"

interface GameCardProps {
  title: string
  subtitle: string
  image: string
  logo?: string
  showButtons?: boolean
  imageClassName?: string
  progress?: { active: number; total: number }
  paused?: boolean
  onPauseToggle?: () => void

  // theme per card
  accentColor?: string
  accentTextColor?: string
  pageBgColor?: string
}

export function GameCard(props: GameCardProps) {
  const {
    title,
    subtitle,
    image,
    logo,
    showButtons = true,
    imageClassName,
    progress,
    paused,
    onPauseToggle,
    accentColor = "#2B7BFF",
    accentTextColor = "#ffffff",
    pageBgColor = "#000000",
  } = props

  const totalDots = Math.max(0, progress?.total ?? 0)
  const activeDot = progress?.active ?? 0

  const R = 44

  const NOTCH_W = 112
  const NOTCH_H = 82
  const NOTCH_R = 56

  const PAUSE_W = 104
  const PAUSE_H = 56

  // ✅ ONLY TWO OUTWARD CUTS (tweak these)
  const CUT_SIZE_TOP = 56
  const CUT_SIZE_BOTTOM = 56

  // where they sit (from bottom of the card)
  // adjust these 2 numbers to match your exact screenshot
  const CUT_TOP_Y = NOTCH_H - 8 // cut near top of the notch area
  const CUT_BOTTOM_Y = 18       // cut near bottom curve area

  return (
    <div
      className="relative w-full aspect-9/14 group"
      style={
        {
          ["--primary" as any]: accentColor,
          ["--primary-foreground" as any]: accentTextColor,
          ["--accent" as any]: accentColor,
          ["--accent-foreground" as any]: accentTextColor,
          ["--pageBg" as any]: pageBgColor,
        } as React.CSSProperties
      }
    >
      <div className="relative h-full w-full overflow-hidden" style={{ borderRadius: R }}>
        {/* Background Image */}
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          priority
          className={`${imageClassName ?? "object-cover object-center"} transition-transform duration-500 group-hover:scale-105`}
        />

        {/* ✅ TWO OUTWARD CUTS ONLY (pageBg circles) */}
        {showButtons && (
          <>
            {/* Top cut (your top circle) */}
            <div
              className="absolute right-0 pointer-events-none"
              style={{
                width: CUT_SIZE_TOP,
                height: CUT_SIZE_TOP,
                borderRadius: 9999,
                background: "var(--pageBg)",
                // sits on the right edge, slightly inside so it "bites" the image
                bottom: CUT_TOP_Y,
                transform: "translateX(45%)",
              }}
            />

            {/* Bottom cut (your bottom circle) */}
            <div
              className="absolute right-0 pointer-events-none"
              style={{
                width: CUT_SIZE_BOTTOM,
                height: CUT_SIZE_BOTTOM,
                borderRadius: 9999,
                background: "var(--pageBg)",
                bottom: CUT_BOTTOM_Y,
                transform: "translateX(45%)",
              }}
            />
          </>
        )}

        {/* Gradient Overlay */}
        <div
          className={
            showButtons
              ? "absolute inset-0 bg-linear-to-t from-black/65 via-black/15 to-transparent"
              : "absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent"
          }
        />

        {/* Accent glow near bottom */}
        {showButtons && (
          <div
            className="absolute inset-x-0 bottom-0 h-44 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, color-mix(in oklab, var(--primary) 35%, transparent) 0%, transparent 100%)",
            }}
          />
        )}

        {/* Notch cutout */}
        {showButtons && (
          <div
            className="absolute bottom-0 right-0"
            style={{
              width: NOTCH_W,
              height: NOTCH_H,
              background: "var(--pageBg)",
              borderTopLeftRadius: NOTCH_R,
            }}
          />
        )}

        {/* Content */}
        <div
          className={[
            "absolute inset-0 flex flex-col justify-end p-6 gap-3",
            showButtons ? "pr-24 pb-8" : "",
          ].join(" ")}
        >
          {/* Logo and Title */}
          <div className="space-y-2">
            {logo ? (
              <div className="flex items-center gap-3">
                <Image src={logo} alt={`${title} logo`} width={54} height={54} className="shrink-0" />
                <div className="flex flex-col">
                  <p className="text-sm text-white/85 font-semibold tracking-wide uppercase leading-none">
                    {subtitle}
                  </p>
                  <h2 className="text-3xl font-bold text-white text-balance leading-tight mt-1">
                    {title}
                  </h2>
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm text-white/70 font-medium tracking-wide uppercase">{subtitle}</p>
                <h2 className="text-3xl font-bold text-white text-balance leading-tight">{title}</h2>
              </>
            )}
          </div>

          {/* Action Buttons */}
          {showButtons && (
            <div className="flex flex-col gap-3 items-center">
              <Button
                size="lg"
                className="
                  w-full max-w-[360px] mx-auto
                  h-11 px-6
                  text-[15px] font-semibold rounded-full
                  hover:opacity-90
                "
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                }}
              >
                Watch Trailer
                <Play className="w-4 h-4 ml-2" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="
                  w-full max-w-[360px] mx-auto
                  h-11 px-6
                  text-[15px] font-semibold rounded-full
                  border-2 border-white/20
                "
                style={{
                  color: "white",
                }}
              >
                Learn More
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Progress */}
          {showButtons && (
            <div className="flex items-center justify-start gap-2 pt-1">
              {(totalDots > 0 ? Array.from({ length: totalDots }) : Array.from({ length: 3 })).map((_, idx) => {
                const isActive = totalDots > 0 ? idx === activeDot : idx === 0
                return (
                  <div
                    key={idx}
                    className="h-1 rounded-full"
                    style={{
                      width: 56,
                      background: isActive ? "rgb(255 255 255 / 0.95)" : "rgb(255 255 255 / 0.22)",
                    }}
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Pause Button */}
      {showButtons && (
        <div className="absolute -bottom-1 -right-4">
          <button
            className="
              backdrop-blur-xl
              flex items-center justify-center
              transition-colors
              rounded-b-[28px] rounded-t-[18px]
            "
            style={{
              width: PAUSE_W,
              height: PAUSE_H,
              background: "color-mix(in oklab, black 55%, var(--primary) 18%)",
            }}
            aria-label={paused ? "Play" : "Pause"}
            onClick={onPauseToggle}
            type="button"
          >
            {paused ? (
              <div
                className="w-0 h-0"
                style={{
                  borderTop: "7px solid transparent",
                  borderBottom: "7px solid transparent",
                  borderLeft: "10px solid rgba(255,255,255,0.9)",
                  marginLeft: 2,
                }}
              />
            ) : (
              <div className="flex gap-1">
                <div className="w-1 h-5 bg-white/90 rounded-full" />
                <div className="w-1 h-5 bg-white/90 rounded-full" />
              </div>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
