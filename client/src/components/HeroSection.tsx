import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImage from "@assets/generated_images/bc_mountain_road_motorcycle.png";

export default function HeroSection() {
  const scrollToStorage = () => {
    const element = document.querySelector("#storage");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
          data-testid="text-hero-title"
        >
          Your Urban Moto Clubhouse
        </h1>
        <p
          className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
          data-testid="text-hero-subtitle"
        >
          Premium motorcycle storage, professional maintenance, and a true rider
          community. Built for BC riders who demand the best for their machines.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
          <Button
            size="lg"
            className="text-base px-8"
            onClick={scrollToStorage}
            data-testid="button-hero-storage"
          >
            Explore Storage Options
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-base px-8 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            data-testid="button-hero-membership"
          >
            View Memberships
          </Button>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-12 text-white/80">
          <div className="text-center" data-testid="stat-bikes">
            <div className="text-3xl sm:text-4xl font-bold text-white">500+</div>
            <div className="text-sm">Bikes Stored</div>
          </div>
          <div className="text-center" data-testid="stat-members">
            <div className="text-3xl sm:text-4xl font-bold text-white">200+</div>
            <div className="text-sm">Active Members</div>
          </div>
          <div className="text-center" data-testid="stat-years">
            <div className="text-3xl sm:text-4xl font-bold text-white">8</div>
            <div className="text-sm">Years in BC</div>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToStorage}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors animate-bounce"
        data-testid="button-scroll-down"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
}
