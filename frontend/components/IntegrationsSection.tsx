import { motion } from "framer-motion";
import { Mail, Calendar, Database, FileText, MessageCircle, Cloud } from "lucide-react";

const IntegrationsSection = () => {
  const integrations = [
    { name: "Email Service", icon: Mail },
    { name: "Calendar", icon: Calendar },
    { name: "Database", icon: Database },
    { name: "Documents", icon: FileText },
    { name: "Chat", icon: MessageCircle },
    { name: "Storage", icon: Cloud },
  ];

  return (
    <section className="relative py-24 overflow-hidden border-t border-border/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            We support nearly all SaaS
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with your favorite tools and services. Build workflows that span across your entire tech stack.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto"
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-center p-6 bg-secondary/20 border border-border rounded-xl hover:border-primary/30 hover:bg-secondary/30 transition-all duration-300 group"
            >
              <integration.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-xs text-center text-muted-foreground group-hover:text-foreground transition-colors">
                {integration.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-muted-foreground">
            And{" "}
            <span className="text-primary font-semibold">200+ more integrations</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
