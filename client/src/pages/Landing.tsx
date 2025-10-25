import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import Footer from "@/components/Footer";

export default function Landing() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />
      <HeroSection />
      <BenefitsSection />
      <Footer />
    </div>
  );
}
