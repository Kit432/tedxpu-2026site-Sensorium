import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EventSection from "@/components/EventSection";
import TeamSection from "@/components/TeamSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import ConsoleSignature from "@/components/misc/ConsoleSignature";

export default function HomePage() {
  return (
    <main className="bg-white text-black">
      {/*
          Built by Λιν Χονγκ Τσε (Κιτ) — TEDxPanteion University Sensorium Website
          Github: https://github.com/Kit432
      */}
      <ConsoleSignature />
      <Header />
      <Hero />
      <div className="site-sections">
        <EventSection />
        <TeamSection />
        <div className="about-section">
          <AboutSection />
        </div>
      </div>
      <Footer />
    </main>
  );
}
