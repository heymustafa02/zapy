import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const TestimonialSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Less manual work, more time for what matters
          </h2>
          <p className="text-muted-foreground">
            See how teams are transforming their workflows
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <Card className="p-8 md:p-12 bg-card/30 border-border">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Image Side */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 border border-border">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-cyan to-brand-blue opacity-50" />
                </div>
              </div>

              {/* Testimonial Side */}
              <div className="space-y-6">
                <Quote className="w-12 h-12 text-primary opacity-50" />
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Sarah Mitchell</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    "Zapy has completely transformed how we handle automation. 
                    What used to take our team hours now happens automatically. 
                    The AI-powered workflows are incredibly intuitive and powerful."
                  </p>
                  <div className="pt-4">
                    <p className="font-semibold">Sarah Mitchell</p>
                    <p className="text-sm text-muted-foreground">Head of Operations, TechCorp</p>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-primary text-primary"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;
