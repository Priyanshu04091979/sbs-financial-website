export default function ContactInfoMap() {
  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.1234567890123!2d72.5200!3d23.0100!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848abad5e24b%3A0x6d5e9c1d99d0e1b9!2sPrahlad%20Nagar%2C%20Ahmedabad%2C%20Gujarat%20380015!5e0!3m2!1sen!2sin!4v1234567890";

  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-[#b8974a] text-sm font-semibold tracking-widest uppercase mb-2">Find Us</p>
          <h2 className="text-3xl md:text-4xl font-serif text-[#0d1b3e]">Visit Our Office</h2>
        </div>
        <div className="relative rounded-2xl overflow-hidden h-[420px] md:h-[500px]">
          <iframe src={mapSrc} width="100%" height="100%" style={{ border: 0 }} allowFullScreen
            loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            title="SBS Financials Office Location" className="absolute inset-0 w-full h-full" />
          <div className="absolute top-5 left-5 bg-[#2a2a2a]/90 backdrop-blur-sm text-white rounded-xl p-5 max-w-[260px] shadow-lg">
            <h3 className="font-bold text-base mb-3">SBS Financials</h3>
            <div className="flex items-start gap-2 mb-3">
              <svg className="w-4 h-4 text-[#b8974a] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-sm leading-snug">4th Floor, Prahlad Nagar,<br />Ahmedabad, Gujarat 380015</p>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-4 h-4 text-[#b8974a] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm">Mon – Sat, 9 AM – 6 PM</p>
            </div>
            <a href="https://maps.google.com/?q=Prahlad+Nagar+Ahmedabad+Gujarat+380015"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#b8974a] text-white text-xs font-bold tracking-wider uppercase px-4 py-2 rounded-full hover:bg-[#a07d38] transition-colors duration-200">
              Get Directions
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}