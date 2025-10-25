import { Button } from "@/components/ui-scss/Button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/Rostov_region_abstract_map_hero_2627820f.png";

export default function HeroSection() {
  return (
    <section className="hero" style={{ 
      backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.3), hsl(var(--background))), url(${heroImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <h1 className="hero__title" data-testid="text-hero-title" style={{ color: 'white' }}>
        Путешествуйте по&nbsp;Ростовской области с&nbsp;умом
      </h1>
      
      <p className="hero__subtitle" data-testid="text-hero-subtitle" style={{ color: 'rgba(255,255,255,0.9)' }}>
        ИИ-помощник для персонализированных маршрутов. Откройте для себя скрытые жемчужины региона.
      </p>

      <div className="hero__actions">
        <Link href="/auth" data-testid="link-cta-hero">
          <Button size="lg" data-testid="button-build-route">
            Проложить маршрут
            <ArrowRight />
          </Button>
        </Link>
      </div>
    </section>
  );
}
