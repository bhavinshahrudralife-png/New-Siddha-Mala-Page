import { useEffect, useState } from "react";
import Scene3D from "../components/Scene3D";
import Nav from "../components/Nav";
import WhatsAppFloat from "../components/WhatsAppFloat";
import Hero from "../sections/Hero";
import MalaAssembly from "../sections/MalaAssembly";
import SiddhaIntro from "../sections/SiddhaIntro";
import Story from "../sections/Story";
import BeadSelector from "../sections/BeadSelector";
import Benefits from "../sections/Benefits";
import Composition from "../sections/Composition";
import Celebrity from "../sections/Celebrity";
import Experts from "../sections/Experts";
import Trusted from "../sections/Trusted";
import FAQ from "../sections/FAQ";
import Enquiry from "../sections/Enquiry";
import Footer from "../sections/Footer";
import { fetchContent } from "../lib/api";

const DEFAULTS = {
  hero_title: "Are you searching for something more — a stillness, a strength, a sense of destiny awakening within you?",
  hero_subtitle: "For thousands of years, seekers, sages, and kings turned to a single sacred treasure to align mind, body and soul — the Siddha Mala. Today, that same sacred power finds its way to those who are ready.",
  phone: "+91 98203 02028",
  email: "info@rudralife.com",
  whatsapp: "919820302028",
  address: "Rudralife®, Mumbai, Maharashtra, India",
  hours: "Mon – Sat · 10:00 AM to 7:00 PM (IST)",
  website: "www.rudralife.com",
  stat_certified: "100%",
  stat_years: "25+",
  stat_souls: "5,00,000+",
};

export default function Landing() {
  const [content, setContent] = useState(DEFAULTS);

  useEffect(() => {
    fetchContent()
      .then((r) => setContent({ ...DEFAULTS, ...r.data }))
      .catch(() => {});
  }, []);

  return (
    <div data-testid="landing-page" className="relative">
      <Scene3D />
      <Nav />
      <main className="relative z-10">
        <Hero content={content} />
        <MalaAssembly />
        <div className="bg-background/90">
          <SiddhaIntro />
          <Story />
          <BeadSelector />
          <Benefits />
          <Composition content={content} />
          <Celebrity />
          <Experts />
          <Trusted />
          <FAQ />
          <Enquiry content={content} />
        </div>
        <Footer content={content} />
      </main>
      <WhatsAppFloat number={content.whatsapp} />
    </div>
  );
}
