import { Card } from "@/components/ui/card";
import { Bot, MessageSquare, Workflow, Zap } from "lucide-react";
import { motion } from "framer-motion";

const FeaturesSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Your AI-Powered Automation Engine
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Easily build AI agents, automate workflows, and connect your apps — no heavy setup, no steep learning curve.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="p-8 bg-card/30 border-border hover:border-primary/30 transition-all duration-300 group h-full">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3">Build multi-step AI agents</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Build intelligent agents that handle complex, multi-step workflows. Customize logic, connect apps, and let AI handle the execution.
                  </p>
                </div>
              </div>

              <div className="relative h-64 bg-secondary/20 rounded-xl border border-border overflow-hidden mt-6">
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="space-y-3 w-full">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-muted/50 rounded-lg border border-border flex items-center justify-center">
                        <Workflow className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 h-8 bg-muted/30 rounded" />
                    </div>
                    <div className="ml-6 space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted/40 rounded-lg border border-border" />
                        <div className="flex-1 h-6 bg-muted/20 rounded" />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted/40 rounded-lg border border-border" />
                        <div className="flex-1 h-6 bg-muted/20 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 bg-card/30 border-border hover:border-primary/30 transition-all duration-300 group h-full">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3">Create chatbots</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Create AI-powered chatbots that can understand, respond, and take action. Perfect for customer support and automation.
                  </p>
                </div>
              </div>

              <div className="relative h-64 bg-secondary/20 rounded-xl border border-border overflow-hidden mt-6 p-4">
                <div className="space-y-3">
                  <div className="flex justify-end">
                    <div className="bg-foreground text-background px-4 py-2.5 rounded-xl max-w-[80%]">
                      <p className="text-sm">Summarize all emails from today and create tasks.</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-muted px-4 py-2.5 rounded-xl max-w-[80%]">
                      <p className="text-sm">Done! Anything else?</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-foreground text-background px-4 py-2.5 rounded-xl max-w-[80%]">
                      <p className="text-sm">Schedule a meeting if needed.</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-muted px-4 py-2.5 rounded-xl max-w-[80%]">
                      <p className="text-sm">Done! I've suggested time slots.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
