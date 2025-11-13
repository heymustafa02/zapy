import { Card } from "@/components/ui/card";
import { Bot, MessageSquare } from "lucide-react";

const Features = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Your AI-Powered Automation Engine
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Easily build AI agents, automate workflows, and connect your apps — no heavy setup, no steep learning curve.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Feature 1 - AI Agents */}
          <Card className="p-8 bg-card/50 border-border hover:border-primary/50 transition-all duration-300 group">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">Build multi-step AI agents</h3>
                <p className="text-muted-foreground">
                  Build intelligent agents that handle complex, multi-step workflows. Customize logic, connect apps, and let AI handle the execution.
                </p>
              </div>
            </div>

            {/* Workflow Visualization Placeholder */}
            <div className="relative h-64 bg-secondary/30 rounded-lg border border-border overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Bot className="w-12 h-12 text-primary mx-auto opacity-50" />
                  <p className="text-sm text-muted-foreground">AI Agent Workflow</p>
                  <div className="flex gap-2 justify-center">
                    <div className="w-16 h-8 bg-muted/50 rounded animate-pulse" />
                    <div className="w-16 h-8 bg-muted/50 rounded animate-pulse delay-75" />
                    <div className="w-16 h-8 bg-muted/50 rounded animate-pulse delay-150" />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Feature 2 - Chatbots */}
          <Card className="p-8 bg-card/50 border-border hover:border-primary/50 transition-all duration-300 group">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">Create chatbots</h3>
                <p className="text-muted-foreground">
                  Create AI-powered chatbots that can understand, respond, and take action. Perfect for customer support and automation.
                </p>
              </div>
            </div>

            {/* Chat Interface Placeholder */}
            <div className="relative h-64 bg-secondary/30 rounded-lg border border-border overflow-hidden p-4">
              <div className="space-y-3">
                <div className="flex justify-end">
                  <div className="bg-foreground text-background px-4 py-2 rounded-lg max-w-[80%]">
                    <p className="text-sm">Summarize all emails from today and create tasks in Asana.</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-muted px-4 py-2 rounded-lg max-w-[80%]">
                    <p className="text-sm">Done! Anything else?</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-foreground text-background px-4 py-2 rounded-lg max-w-[80%]">
                    <p className="text-sm">If any require scheduling a meeting, suggest available time slots.</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-muted px-4 py-2 rounded-lg max-w-[80%]">
                    <p className="text-sm">Done! One needs a meeting, I've suggested time slots based on your calendar.</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;
