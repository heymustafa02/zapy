// import { Appbar } from "@/components/Appbar";
// import { Hero } from "@/components/Hero";
// import { HeroVideo } from "@/components/HeroVideo";

// export default function Home() {
//   return (
//     <main className="pb-48">
//         <Appbar />
//         <Hero />
//         <div className="pt-8">
//           <HeroVideo />
//         </div>
//     </main>
//   );
// }
"use client"
import FloatingNav from "@/components/FloatingNav";
import HeroSection from "@/components/HeroSection";
import CompaniesSection from "@/components/CompaniesSection";
import FeaturesSection from "@/components/FeaturesSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import UseCasesSection from "@/components/UseCasesSection";
import TestimonialSection from "@/components/TestimonialSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <FloatingNav />
      <HeroSection />
      <CompaniesSection />
      <FeaturesSection />
      <IntegrationsSection />
      <UseCasesSection />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
