import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Workflow, 
  TrendingUp, 
  Shield, 
  Zap, 
  Users,
  Code,
  Globe
} from "lucide-react";

const UseCasesSection = () => {
  const useCases = [
    {
      icon: Sparkles,
      title: "Reduce the 'human factor' errors & increase productivity",
      description: "Automate repetitive tasks and minimize manual errors with intelligent workflows."
    },
    {
      icon: Workflow,
      title: "Powerful automation with low-code workflows",
      description: "Build complex automations without writing extensive code. Drag, drop, and configure."
    },
    {
      icon: TrendingUp,
      title: "Transform traditional business processes",
      description: "Modernize legacy workflows with AI-powered automation and smart integrations."
    },
    {
      icon: Shield,
      title: "Build Enterprise AI Applications",
      description: "Create secure, scalable AI applications that meet enterprise standards."
    },
    {
      icon: Zap,
      title: "Automate or Idle Instantly",
      description: "Deploy automations instantly or schedule them to run when needed."
    },
    {
      icon: Users,
      title: "Build, Deploy & Coordinate AI Agents",
      description: "Create teams of AI agents that work together to accomplish complex tasks."
    },
    {
      icon: Code,
      title: "Extensible with JavaScript & Python",
      description: "Extend functionality with custom code when you need more control."
    },
    {
      icon: Globe,
      title: "Great as the 'Process Hub' for complex workflows",
      description: "Centralize and orchestrate all your business processes in one place."
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-secondary/5">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful automation for every use case
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From simple workflows to complex enterprise solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="p-6 bg-card/30 border-border hover:border-primary/30 transition-all duration-300 h-full group">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
                    <useCase.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-base font-semibold mb-2 leading-tight">
                  {useCase.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {useCase.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
