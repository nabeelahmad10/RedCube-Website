import { Navbar } from "@/components/navbar"
import { GameCard } from "@/components/game-card"
import { GameShowcase } from "@/components/game-showcase"
import { GameInfoSection } from "@/components/game-info-section"
import { GameThumbnail } from "@/components/game-thumbnail"
import { Footer } from "@/components/footer"
import { HeroRotator } from "@/components/hero-rotator"
import { NewsPeekCarousel } from "@/components/NewsPeekCarousel"


export default function HomePage() {
  const exploreGames = [
    { image: "/action-game-1.jpg", title: "Game 1" },
    { image: "/action-game-2.jpg", title: "Game 2" },
    { image: "/action-game-3.jpg", title: "Game 3" },
    { image: "/action-game-4.jpg", title: "Game 4" },
    { image: "/action-game-5.jpg", title: "Game 5" },
    { image: "/action-game-6.jpg", title: "Game 6" },
  ]

  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section - Burn Point */}
      <section className="pt-24 pb-8 px-4">
        <div className="container mx-auto max-w-sm">
          <HeroRotator />
        </div>
      </section>

      {/* Game Showcase Section */}
      <GameShowcase />

      <section className="py-4">
        <div className="container mx-auto max-w-md">
          <GameInfoSection
            logo="/images/burn-point-logo.png"
            description="In BURN POINT, you control your survival. As the last racer in a world where winning means everything, it's up to you to conquer the streets and own the drift. Make your choices, face the consequences."
          />
        </div>
      </section>

   <NewsPeekCarousel />


      <Footer />
    </main>
  )
}
