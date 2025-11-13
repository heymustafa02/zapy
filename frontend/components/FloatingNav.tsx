"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
const FloatingNav = () => {
   const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  className={`fixed top-4 inset-x-0 mx-auto z-50 transition-all duration-300 ${
    scrolled ? "w-[95%] max-w-6xl" : "w-[95%] max-w-7xl"
  }`}>

      <div
        className={`rounded-2xl border transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-xl border-border shadow-lg"
            : "bg-background/80 backdrop-blur-md border-border/50"
        }`}
      >
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-cyan to-brand-blue rounded-lg flex items-center justify-center">
                <span className="text-background font-bold text-lg">Z</span>
              </div>
              <span className="text-xl font-semibold hidden sm:block">Zapy</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <a href="#docs" className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105">
                Docs
              </a>
              <a href="#blog" className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105">
                Blog
              </a>
              <a href="#discord" className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105">
                Discord
              </a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105">
                Pricing
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden md:flex hover:bg-muted/50 transition-all duration-300"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {mounted && (theme === "dark" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                ))}
              </Button>
              
                         
              <Button 
                variant="ghost" 
                className="hidden md:inline-flex text-sm hover:bg-muted/50 transition-all duration-300"
                onClick={() => {
                              router.push("/login")
                          }}
              >
                Login
              </Button>
              <Button 
                variant="ghost" 
                className="hidden md:inline-flex text-sm hover:bg-muted/50 transition-all duration-300"
                onClick={() => {
                              router.push("/signup")
                          }}
              >
                Sign Up
              </Button>
              <Button className="bg-foreground text-background hover:bg-foreground/90 text-sm hover:scale-105 transition-all duration-300 shadow-lg">
                Book a Demo
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-muted/50 transition-all duration-300"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden overflow-hidden"
              >
                <div className="pt-4 pb-2 space-y-3 border-t border-border mt-4">
                  <a href="#docs" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Docs
                  </a>
                  <a href="#blog" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </a>
                  <a href="#discord" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Discord
                  </a>
                  <a href="#pricing" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Pricing
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};

export default FloatingNav;
