import { motion } from "framer-motion";

const CompaniesSection = () => {
  const companies = [
    { name: "TechCorp", width: "w-32" },
    { name: "DataFlow", width: "w-28" },
    { name: "CloudSync", width: "w-36" },
    { name: "AutoScale", width: "w-32" },
  ];

  return (
    <section className="relative py-20 overflow-hidden border-y border-border/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Built for companies that move fast
          </h2>
          <p className="text-muted-foreground text-sm">
            Trusted by innovative teams around the world
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-12 md:gap-16"
        >
          {companies.map((company, index) => (
            <div
              key={index}
              className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300"
            >
              <div className={`h-8 ${company.width} bg-muted/30 rounded flex items-center justify-center border border-border/30`}>
                <span className="text-xs font-semibold text-muted-foreground">{company.name}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CompaniesSection;
