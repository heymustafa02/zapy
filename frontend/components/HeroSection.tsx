"use client"
import { Button } from "@/components/ui/button";
import { Github, ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-5xl mx-auto"
        >
          {/* GitHub Badge */}
          <motion.a
            href="https://github.com/heymustafa02/zapy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-secondary/60 border border-border hover:bg-secondary hover:border-primary/30 transition-all duration-300 mb-8 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-2">
              <Github className="w-4 h-4" />
              <span className="text-sm font-medium">Zapy</span>
            </div>
            <div className="flex items-center gap-1.5 pl-2 border-l border-border">
              <Star className="w-3.5 h-3.5 fill-primary text-primary" />
              <span className="text-xs font-semibold">1.2k</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </motion.a>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-[5.5rem] font-bold leading-[1.1] mb-6 tracking-tight"
          >
            Automate and
            <br />
            Integrate with <span className="text-gradient">AI-</span>
            <br />
            <span className="text-gradient">Driven Workflows</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            Build AI agents, automate workflows, and integrate applications seamlessly with Zapy – open-source, enterprise-ready platform.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16"
          >
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 py-6 border-border hover:bg-secondary/80 hover:border-primary/30 transition-all"
            >
              Get started
            </Button>
            <Button
              size="lg"
              className="text-base px-8 py-6 bg-foreground text-background hover:bg-foreground/90"
            >
              Book a Demo
            </Button>
          </motion.div>

          {/* Hero Image/Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full max-w-5xl"
          >
            <div className="relative rounded-2xl border border-border overflow-hidden bg-secondary/20 backdrop-blur-sm">
              <div className="aspect-[16/9] bg-gradient-to-br from-secondary/50 to-background p-8">
                {/* Mockup Interface */}
                <div className="h-full bg-background/40 rounded-xl border border-border/50 p-6 flex items-center justify-center">
                  <div className="text-center space-y-3 max-w-md">
                    <div className="w-16 h-16 bg-gradient-to-br from-brand-cyan to-brand-blue rounded-xl mx-auto mb-4 animate-pulse" />
                    <h3 className="text-xl font-semibold">Workflow Builder Interface</h3>
                    <p className="text-sm text-muted-foreground">
                      Drag and drop nodes to create complex automation workflows
                    </p>
                    <div className="flex gap-3 justify-center pt-4">
                      <div className="w-20 h-20 bg-secondary/60 rounded-lg border border-border" />
                      <div className="w-20 h-20 bg-secondary/60 rounded-lg border border-border" />
                      <div className="w-20 h-20 bg-secondary/60 rounded-lg border border-border" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
