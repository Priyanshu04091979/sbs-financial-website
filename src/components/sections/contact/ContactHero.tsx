"use client";

import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

export default function ContactHero() {
  return (
    <section className="w-full bg-[#fff8ef] rounded-b-[28px] px-8 py-12 md:pb-14 md:pt-12">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-[28px] items-center">

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