import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink } from "lucide-react"

interface GameInfoSectionProps {
  logo: string
  title: string
  description: string
  image: string
}

export function GameInfoSection({ logo, title, description, image }: GameInfoSectionProps) {
  return (
    <div className="w-full space-y-6 px-4 py-8">
      {/* Logo and Title */}
      <div className="flex items-start gap-4">
        <Image src={logo || "/placeholder.svg"} alt={title} width={80} height={80} className="rounded-lg" />
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-white/70 text-sm leading-relaxed">{description}</p>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 items-center">
        <Button size="lg" className="w-full bg-white text-black hover:bg-white/90 font-semibold rounded-full">
          <Download className="w-4 h-4 mr-2" />
          Download Now
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="w-auto max-w-[70%] mx-auto py-2 text-base min-h-[44px] bg-transparent border-2 border-primary text-white hover:bg-primary/20 font-semibold rounded-full"
        >
          Learn More
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Featured Image */}
      <div className="w-full aspect-video rounded-2xl overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={600}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}
