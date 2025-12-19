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

  return (
    <div
      className="relative w-full aspect-9/14 group"
      style={
        {
          // ✅ Override shadcn tokens inside this card only
          ["--primary" as any]: accentColor,
          ["--primary-foreground" as any]: accentTextColor,

          // optional: also set accent vars if you use them elsewhere
          ["--accent" as any]: accentColor,
          ["--accent-foreground" as any]: accentTextColor,

          // notch cutout bg (match page)
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
              width: 130,
              height: 96,
              background: "var(--pageBg)",
              borderTopLeftRadius: 64,
            }}
          />
        )}

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 gap-4">
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
            <div className="flex flex-col gap-4 items-center">
              <Button
                size="lg"
                className="w-auto max-w-[70%] mx-auto py-2 text-base min-h-[44px] font-semibold rounded-full
                           bg-primary text-primary-foreground hover:opacity-90"
              >
                Watch Trailer
                <Play className="w-4 h-4 ml-2" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-auto max-w-[70%] mx-auto py-2 text-base min-h-[44px] font-semibold rounded-full
                           bg-transparent text-white hover:bg-white/10 border-2 border-primary/40"
              >
                Learn More
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Progress */}
          {showButtons && (
            <div className="flex items-center justify-start gap-2">
              {(totalDots > 0 ? Array.from({ length: totalDots }) : Array.from({ length: 3 })).map((_, idx) => {
                const isActive = totalDots > 0 ? idx === activeDot : idx === 0
                return (
                  <div
                    key={idx}
                    className="h-1 rounded-full"
                    style={{
                      width: 56,
                      background: isActive ? "var(--primary)" : "rgb(255 255 255 / 0.22)",
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
        <div className="absolute -bottom-3 -right-3">
          <button
            className="backdrop-blur-xl rounded-[34px] flex items-center justify-center transition-colors"
            style={{
              width: 120,
              height: 68,
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
