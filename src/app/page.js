
import CtaSection from "@/components/CtaSection";
import FaqSection from "@/components/FaqSection";
import FeaturedDoctors from "@/components/FeaturedDoctors";
import FeaturesSection from "@/components/FeaturesSection";
import Hero from "@/components/HeroBanner";
import TestimonialsSection from "@/components/TestimonialsSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col flex-1 items-center justify-center space-y-23 bg-zinc-50 font-sans dark:bg-black">
     <Hero />
     <FeaturesSection />
     <TestimonialsSection />
     <FaqSection />
     <FeaturedDoctors />
     <CtaSection />
    </div>
  );
}
