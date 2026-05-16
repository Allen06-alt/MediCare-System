import ContactHero from "../../components/contact/ContactHero";
import Testimonials from "../../components/contact/Testimonials";
import ContactCTA from "../../components/contact/ContactCTA";

export default function ContactPage() {
  return (
    <div className="min-h-screen">

      <ContactHero />

      <Testimonials />

      <ContactCTA />

    </div>
  );
}