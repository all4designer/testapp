import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/Rostov_region_abstract_map_hero_2627820f.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-background"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-24 pb-16 text-center">
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 animate-fade-in"
          data-testid="text-hero-title"
        >
          Путешествуйте по&nbsp;Ростовской области с&nbsp;умом
        </h1>
        
        <p 
          className="text-lg sm:text-xl md:text-2xl text-white/90 font-light mb-12 max-w-3xl mx-auto animate-fade-in-delay"
          data-testid="text-hero-subtitle"
        >
          ИИ-помощник для персонализированных маршрутов. Откройте для себя скрытые жемчужины региона.
        </p>

        <Link href="/auth" data-testid="link-cta-hero">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 animate-fade-in-delay-2"
            data-testid="button-build-route"
          >
            Проложить маршрут
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        .animate-fade-in-delay {
          opacity: 0;
          animation: fadeIn 0.8s ease-out 0.2s forwards;
        }
        .animate-fade-in-delay-2 {
          opacity: 0;
          animation: fadeIn 0.8s ease-out 0.4s forwards;
        }
      `}</style>
    </section>
  );
}
