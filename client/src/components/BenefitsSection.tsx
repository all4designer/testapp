import { Sparkles, Wifi, Ticket } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: <Sparkles className="w-8 h-8 text-primary" />,
    title: "Персонализация",
    description: "ИИ создаёт маршруты на основе ваших интересов и предпочтений"
  },
  {
    icon: <Wifi className="w-8 h-8 text-primary" />,
    title: "Офлайн-режим",
    description: "Сохраняйте маршруты и пользуйтесь ими без подключения к интернету"
  },
  {
    icon: <Ticket className="w-8 h-8 text-primary" />,
    title: "Билеты в один клик",
    description: "Бронируйте билеты и экскурсии прямо в приложении"
  }
];

function BenefitCard({ benefit, index }: { benefit: Benefit; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 150);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [index]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      data-testid={`card-benefit-${index}`}
    >
      <div className="bg-card border border-card-border rounded-xl p-8 h-full hover-elevate active-elevate-2">
        <div className="mb-4" data-testid={`icon-benefit-${index}`}>{benefit.icon}</div>
        <h3 className="text-xl font-semibold mb-3" data-testid={`text-benefit-title-${index}`}>
          {benefit.title}
        </h3>
        <p className="text-muted-foreground" data-testid={`text-benefit-description-${index}`}>
          {benefit.description}
        </p>
      </div>
    </div>
  );
}

export default function BenefitsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4" data-testid="text-benefits-title">
            Почему РостовМаршрут?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-benefits-subtitle">
            Современные технологии для незабываемых путешествий
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
