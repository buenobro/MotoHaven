import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Bike } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Storage", href: "#storage" },
  { label: "Services", href: "#services" },
  { label: "Membership", href: "#membership" },
  { label: "Community", href: "#community" },
  { label: "Contact", href: "#contact" },
];

interface NavigationProps {
  isScrolled?: boolean;
}

export default function Navigation({ isScrolled = false }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border"
          : "bg-transparent"
      }`}
      data-testid="navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          <a
            href="#"
            className="flex items-center gap-2"
            data-testid="link-home"
          >
            <Bike className="h-8 w-8 text-primary" />
            <span
              className={`text-xl font-bold tracking-tight ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            >
              MotoVault BC
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors hover-elevate ${
                  isScrolled
                    ? "text-foreground"
                    : "text-white/90 hover:text-white"
                }`}
                data-testid={`link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <Button
              size="default"
              className={
                isScrolled
                  ? ""
                  : "bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
              }
              data-testid="button-book-now"
            >
              Book Now
            </Button>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                size="icon"
                variant="ghost"
                className={isScrolled ? "" : "text-white hover:bg-white/20"}
                data-testid="button-mobile-menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="text-lg font-medium text-foreground hover-elevate px-4 py-2 rounded-md text-left"
                    data-testid={`mobile-link-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </button>
                ))}
                <Button className="mt-4" data-testid="mobile-button-book-now">
                  Book Now
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
