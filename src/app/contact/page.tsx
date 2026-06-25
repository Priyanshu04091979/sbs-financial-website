import ContactHero from "@/components/sections/contact/ContactHero";
import ContactInfoMap from "@/components/sections/contact/ContactInfoMap";
import ContactForm from "@/components/sections/contact/ContactForm";
import ConsulationCTA from "@/components/sections/contact/ConsulationCTA";

export const metadata = {
  title: "Contact Us | SBS Financial Services",
  description:
    "Get in touch with SBS Financial Services. Book a free consultation, reach us by phone or email, or visit our office in Ahmedabad, Gujarat.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ConsulationCTA />
      <ContactForm />
      <ContactInfoMap />
    </>
  );
}
