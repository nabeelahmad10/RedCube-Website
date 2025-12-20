export function Footer() {
  return (
    <footer className="w-full bg-black py-8 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Device Wrapper */}
        <div className="relative mx-auto w-full max-w-5xl aspect-[360/146.16]">
          {/* Steam Deck Frame */}
          <img
            src="/images/steam-deck-frame.png"
            alt="Gaming Device"
            className="absolute inset-0 w-full h-full select-none pointer-events-none object-cover"
          />

          {/* Screen Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Screen safe area (tuned for frame) */}
            <div className="relative w-[61%] h-[82%] rounded-[4px] overflow-hidden">
              {/* Dark blurred background */}
              <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />
              {/* Vignette */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/50" />

              {/* Content */}
              <div className="relative z-10 h-full w-full px-[5%] py-[5%] flex items-center">
                <div className="w-full grid grid-cols-2 gap-x-[8%] gap-y-[8%]">
                  {/* Left */}
                  <div className="min-w-0">
                    <p className="font-semibold text-white mb-[10%] text-[clamp(10px,1.2vw,14px)]">
                      Terms &amp; Conditions
                    </p>

                    <div className="space-y-[clamp(4px,0.6vw,8px)] text-white/80 text-[clamp(9px,1vw,12px)] leading-tight">
                      <p>Support</p>
                      <p>Privacy &amp; Cookies</p>
                      <p>Terms of Use</p>
                      <p>Legal</p>
                      <p>Health Warning</p>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="min-w-0">
                    <p className="font-semibold text-white underline underline-offset-2 mb-[10%] text-[clamp(10px,1.2vw,14px)]">
                      Contact Us:
                    </p>

                    <div className="space-y-[clamp(4px,0.6vw,8px)] text-white/80 text-[clamp(9px,1vw,12px)] leading-tight">
                      <a
                        href="mailto:info.redcube@gmail.com"
                        className="block truncate hover:text-white transition-colors"
                        title="info.redcube@gmail.com"
                      >
                        info.redcube@gmail.com
                      </a>
                      <p>Facebook</p>
                      <p>X</p>
                      <p>Instagram</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* End content */}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="mt-4 text-center text-[9px] sm:text-xs text-white/50">
          © 2025 Burn Point Studios. Committed to Entertainment.
        </p>
      </div>
    </footer>
  )
}
