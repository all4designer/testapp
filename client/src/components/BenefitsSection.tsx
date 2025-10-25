import { Sparkles, Wifi, Ticket } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui-scss/Card";

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: <Sparkles style={{ width: '2rem', height: '2rem', color: 'hsl(118, 52%, 50%)' }} />,
    title: "Персонализация",
    description: "ИИ создаёт маршруты на основе ваших интересов и предпочтений"
  },
  {
    icon: <Wifi style={{ width: '2rem', height: '2rem', color: 'hsl(118, 52%, 50%)' }} />,
    title: "Офлайн-режим",
    description: "Сохраняйте маршруты и пользуйтесь ими без подключения к интернету"
  },
  {
    icon: <Ticket style={{ width: '2rem', height: '2rem', color: 'hsl(118, 52%, 50%)' }} />,
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
      style={{
        transition: 'all 0.7s ease',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(2rem)'
      }}
      data-testid={`card-benefit-${index}`}
    >
      <Card hover style={{ padding: '2rem', height: '100%' }}>
        <div style={{ marginBottom: '1rem' }} data-testid={`icon-benefit-${index}`}>{benefit.icon}</div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }} data-testid={`text-benefit-title-${index}`}>
          {benefit.title}
        </h3>
        <p className="text-muted" data-testid={`text-benefit-description-${index}`}>
          {benefit.description}
        </p>
      </Card>
    </div>
  );
}

export default function BenefitsSection() {
  return (
    <section style={{ padding: '6rem 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 300, marginBottom: '1rem' }} data-testid="text-benefits-title">
            Почему РостовМаршрут?
          </h2>
          <p style={{ fontSize: '1.125rem', maxWidth: '42rem', margin: '0 auto' }} className="text-muted" data-testid="text-benefits-subtitle">
            Современные технологии для незабываемых путешествий
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
