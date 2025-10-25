import { MapPin, Mail, Phone, Instagram, Facebook } from "lucide-react";
import { Link } from "wouter";
import { Card } from "@/components/ui-scss/Card";

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid hsl(var(--card-border))' }}>
      <Card style={{ borderRadius: 0, border: 'none', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <MapPin style={{ width: '1.5rem', height: '1.5rem', color: 'hsl(118, 52%, 50%)' }} />
              <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>СУЕТА РНД</span>
            </div>
            <p className="text-small text-muted">
              ИИ-помощник для персонализированных маршрутов по Ростовской области
            </p>
          </div>

          <div>
            <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>Навигация</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>
                <Link href="/" className="text-small text-muted">Главная</Link>
              </li>
              <li>
                <Link href="/plan" className="text-small text-muted">Маршруты</Link>
              </li>
              <li>
                <Link href="/profile" className="text-small text-muted">Профиль</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>Контакты</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail style={{ width: '1rem', height: '1rem' }} />
                <a href="mailto:info@suetarnd.ru" className="text-small text-muted">info@suetarnd.ru</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone style={{ width: '1rem', height: '1rem' }} />
                <a href="tel:+78632000000" className="text-small text-muted">+7 (863) 200-00-00</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>Мы в соцсетях</h3>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a 
                href="#" 
                style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', backgroundColor: 'rgba(118, 182, 117, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'hsl(118, 52%, 50%)' }}
                aria-label="Instagram"
              >
                <Instagram style={{ width: '1.25rem', height: '1.25rem' }} />
              </a>
              <a 
                href="#" 
                style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', backgroundColor: 'rgba(118, 182, 117, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'hsl(118, 52%, 50%)' }}
                aria-label="Facebook"
              >
                <Facebook style={{ width: '1.25rem', height: '1.25rem' }} />
              </a>
            </div>
          </div>
        </div>

        <div style={{ paddingTop: '2rem', borderTop: '1px solid hsl(var(--border))', textAlign: 'center' }} className="text-small text-muted">
          <p>&copy; 2024 СУЕТА РНД. Все права защищены.</p>
        </div>
      </Card>
    </footer>
  );
}
