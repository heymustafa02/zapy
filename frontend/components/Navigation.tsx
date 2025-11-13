import { Button } from "@/components/ui/button";
import { Moon } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-cyan to-brand-blue rounded-md flex items-center justify-center">
              <span className="text-background font-bold text-lg">B</span>
            </div>
            <span className="text-xl font-semibold">ByteChef</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Docs
            </a>
            <a href="#blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </a>
            <a href="#discord" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Discord
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Moon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" className="hidden md:inline-flex">
              Login
            </Button>
            <Button variant="ghost" className="hidden md:inline-flex">
              Sign Up
            </Button>
            <Button variant="default" className="bg-foreground text-background hover:bg-foreground/90">
              Book a Demo
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
