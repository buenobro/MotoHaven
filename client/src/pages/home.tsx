import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import StorageSection from "@/components/StorageSection";
import ServicesSection from "@/components/ServicesSection";
import MembershipSection from "@/components/MembershipSection";
import CommunitySection from "@/components/CommunitySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation isScrolled={isScrolled} />
      <main>
        <HeroSection />
        <StorageSection />
        <ServicesSection />
        <MembershipSection />
        <CommunitySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
