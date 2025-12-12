import { Bike } from "lucide-react";
import { SiFacebook, SiInstagram, SiYoutube } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "You're on the list!",
        description: "Thanks for subscribing to our newsletter.",
      });
      setEmail("");
    }
  };

  return (
    <footer className="bg-card border-t border-border" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4" data-testid="footer-logo">
              <Bike className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">MotoVault BC</span>
            </a>
            <p className="text-muted-foreground text-sm mb-4">
              BC's premier motorcycle storage and community garage. Keeping riders
              and their machines happy since 2016.
            </p>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" data-testid="link-facebook">
                <SiFacebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" data-testid="link-instagram">
                <SiInstagram className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" data-testid="link-youtube">
                <SiYoutube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#storage" className="text-muted-foreground hover:text-foreground transition-colors">
                  Motorcycle Storage
                </a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
                  Maintenance Packages
                </a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
                  Winterization
                </a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
                  Custom Work
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#membership" className="text-muted-foreground hover:text-foreground transition-colors">
                  Membership
                </a>
              </li>
              <li>
                <a href="#community" className="text-muted-foreground hover:text-foreground transition-colors">
                  Member Profiles
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Group Rides
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Events Calendar
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Get ride updates, maintenance tips, and exclusive member offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                data-testid="input-newsletter"
              />
              <Button type="submit" data-testid="button-subscribe">
                Join
              </Button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p data-testid="text-copyright">
            2024 MotoVault BC. All rights reserved.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
