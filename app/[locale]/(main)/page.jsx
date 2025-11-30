import Hero from "@/components/Hero";
import AboutSection from "@/components/About";
import OurProducts from "@/components/OurProducts";
import CTA from "@/components/CTA";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import Mitra from "@/components/Mitra";
import SeoText from "@/components/SeoText";

export const metadata = {
  title: "Premium Agricultural Exporter from Indonesia | AgroHarvestani",
  description:
    "AgroHarvestani is a leading exporter of high-quality Indonesian agricultural products like cloves, coffee, and coconut oil. We connect local farms to the global market.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Mitra />
      <AboutSection />
      <OurProducts />
      <ScrollAnimation>
        <CTA />
      </ScrollAnimation>
      <SeoText />
    </main>
  );
}
