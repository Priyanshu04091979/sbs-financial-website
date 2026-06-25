"use client";

import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal"],
});

export default function ContactCTA() {
  return (
    <>
      <section className="bg-white py-[80px] px-8 text-center">
        <div className="max-w-[1100px] mx-auto">
          <h2 className={`${playfair.className} text-[34px] font-medium text-[#000613] mb-[18px] tracking-tight`}>
            Book a Free Consultation
          </h2>
          <p className="text-[#43474e] text-[14px] leading-[1.75] max-w-[560px] mx-auto mb-[36px]">
            Use this section to explain what happens after booking — link out to your scheduling
            tool, or embed a calendar widget directly here.
          </p>
          <a
            href="#booking"
            className="inline-flex items-center justify-center gap-2 bg-[#001f3f] text-[#fed65b] text-[12px] font-bold tracking-[0.12em] uppercase px-[34px] py-[15px] rounded-[30px] shadow-sm hover:bg-[#000613] transition-colors duration-250 cursor-pointer"
          >
            Book A Free Consultation
          </a>
        </div>
      </section>

      {/* Divider */}
      <hr className="max-w-[1100px] mx-auto border-none border-t border-[#c4c6cf]" />
    </>
  );
}