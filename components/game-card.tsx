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
  } = props

  const totalDots = Math.max(0, progress?.total ?? 0)
  const activeDot = progress?.active ?? 0

  return (
    <div className="relative w-full aspect-9/14 group">
      <div
        className="relative h-full w-full overflow-hidden"
        style={{ borderRadius: "44px" }}
      >
        {/* Background Image */}
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className={`${imageClassName ?? "object-cover object-center"} transition-transform duration-500 group-hover:scale-105`}
          priority
        />

        {/* Gradient Overlay */}
        <div
          className={
            showButtons
              ? "absolute inset-0 bg-linear-to-t from-black/60 via-black/15 to-transparent"
              : "absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent"
          }
        />

        {/* Bottom-right cutout to match pause notch */}
        {showButtons && (
          <div
            className="absolute bottom-0 right-0 bg-black"
            style={{ width: 116, height: 86, borderTopLeftRadius: 58 }}
          />
        )}

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 gap-4">
          {/* Logo and Title */}
          <div className="space-y-2">
            {logo ? (
              <div className="flex items-center gap-3">
                <Image src={logo || "/placeholder.svg"} alt={`${title} logo`} width={54} height={54} className="shrink-0" />
                <div className="flex flex-col">
                  <p className="text-sm text-white/85 font-semibold tracking-wide uppercase leading-none">{subtitle}</p>
                  <h2 className="text-3xl font-bold text-white text-balance leading-tight mt-1">{title}</h2>
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
              <Button size="lg" className="w-auto max-w-[70%] mx-auto py-2 text-base min-h-[44px] bg-white text-black hover:bg-white/90 font-semibold rounded-full">
                Watch Trailer
                <Play className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-auto max-w-[70%] mx-auto py-2 text-base min-h-[44px] bg-transparent border-2 border-white/30 text-white hover:bg-white/10 font-semibold rounded-full"
              >
                Learn More
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Progress Indicator */}
          {showButtons && (
            <div className="flex items-center justify-start gap-2">
              {totalDots > 0
                ? Array.from({ length: totalDots }).map((_, idx) => (
                    <div
                      // eslint-disable-next-line react/no-array-index-key
                      key={idx}
                      className={`h-1 rounded-full ${idx === activeDot ? "bg-white" : "bg-white/25"}`}
                      style={{ width: 56 }}
                    />
                  ))
                : null}
              {totalDots === 0 ? (
                <>
                  <div className="h-1 bg-white rounded-full" style={{ width: 56 }} />
                  <div className="h-1 bg-white/25 rounded-full" style={{ width: 56 }} />
                  <div className="h-1 bg-white/25 rounded-full" style={{ width: 56 }} />
                </>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {/* Pause Button + Notch */}
      {showButtons && (
        <div className="absolute -bottom-3 -right-3">
          <button
            className="bg-black/55 hover:bg-black/65 backdrop-blur-xl rounded-[34px] flex items-center justify-center transition-colors"
            style={{ width: 120, height: 68 }}
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
                  borderLeft: "10px solid rgba(255,255,255,0.85)",
                  marginLeft: 2,
                }}
              />
            ) : (
              <div className="flex gap-1">
                <div className="w-1 h-5 bg-white/85 rounded-full" />
                <div className="w-1 h-5 bg-white/85 rounded-full" />
              </div>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
