export default function ContactCTA() {
  return (
    <section className="py-16 px-6 text-center">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-[#0d1b3e] mb-4">
          Book a Free Consultation
        </h2>
        <p className="text-gray-500 text-base mb-8">
          Use this section to explain what happens after booking — link out to
          your scheduling tool, or embed a calendar widget directly here.
        </p>
        <a
          href="#booking"
          className="inline-block bg-[#0d1b3e] text-white text-sm font-semibold tracking-widest uppercase px-10 py-4 rounded-full hover:bg-[#1a2e5e] transition-colors duration-200"
        >
          Book a Free Consultation
        </a>
      </div>
    </section>
  );
}