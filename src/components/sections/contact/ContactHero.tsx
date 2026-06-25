  "use client";

  import { Playfair_Display } from "next/font/google";

  const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["500", "600"],
    style: ["normal", "italic"],
  });

  export default function ContactHero() {
    return (
      <section
        
        style={{ paddingTop: "150px", paddingBottom: "100px" }}
        /* ADDED: flex flex-col items-center to force horizontal centering of children */
        className="relative w-full overflow-hidden bg-[#FBF2EA] px-6 pb-16 md:px-16 md:pb-24 scroll-mt-20 flex flex-col items-center"
      >
        {/* ambient pulsing glow accents */}
        <div className="glow-pulse pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-[#A9802F]/10 blur-3xl" />
        <div
          className="glow-pulse pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-[#16162B]/5 blur-3xl"
          style={{ animationDelay: "2s" }}
        />

        <div 
          /* ADDED: inline style margin to override any global CSS resets */
          style={{ margin: "0 auto" }}
          className="relative flex max-w-6xl w-full flex-col items-center gap-10 md:flex-row md:justify-center md:gap-8 lg:gap-12"
        >
          {/* Left image */}
          <div className="hidden md:block h-[210px] rounded-[14px] overflow-hidden border border-[#c4c6cf]">
            <img
              src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=800&auto=format&fit=crop"
              alt="Starry night sky"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Center content */}
          <div className="text-center">
            <span className="text-[12px] font-semibold tracking-[0.2em] text-[#735c00] uppercase mb-[18px] block">
              Get In Touch
            </span>
            <h1 className={`${playfair.className} font-medium text-[36px] sm:text-[42px] md:text-[48px] leading-[1.15] text-[#000613] m-0 mb-[22px]`}>
              Ready to
              <em className="font-medium italic block not-italic">Take Control?</em>
            </h1>
            <p className="text-[15px] text-[#43474e] leading-normal max-w-md mx-auto">
              We&apos;re here to guide you toward financial clarity and confidence.
            </p>
          </div>

          {/* Right image */}
          <div className="hidden md:block h-[210px] rounded-[14px] overflow-hidden border border-[#c4c6cf]">
            <img
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop"
              alt="String lights over a cobblestone alley"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>
    );
  }