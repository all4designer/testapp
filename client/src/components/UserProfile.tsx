import { Card } from "@/components/ui-scss/Card";
import { Button } from "@/components/ui-scss/Button";
import { MapPin, Calendar } from "lucide-react";
import { Link } from "wouter";

const mockRoutes = [
  {
    id: 1,
    name: "Исторический Ростов",
    date: "15 октября 2024",
    points: 5
  },
  {
    id: 2,
    name: "Природа Дона",
    date: "22 октября 2024",
    points: 4
  },
  {
    id: 3,
    name: "Гастрономический тур",
    date: "3 ноября 2024",
    points: 6
  }
];

export default function UserProfile() {
  const initials = "ИИ";
  
  return (
    <div style={{ minHeight: '100vh', paddingTop: '6rem', paddingBottom: '3rem', padding: '6rem 1rem 3rem' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
        <Card style={{ padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{
              width: '6rem',
              height: '6rem',
              borderRadius: '50%',
              backgroundColor: 'rgba(118, 182, 117, 0.1)',
              color: 'hsl(118, 52%, 50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 600
            }}>
              {initials}
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.25rem' }} data-testid="text-user-name">Иван Иванов</h1>
              <p className="text-muted" data-testid="text-user-email">ivan@example.com</p>
            </div>
            <Link href="/plan" data-testid="link-create-route">
              <Button data-testid="button-create-route">Создать маршрут</Button>
            </Link>
          </div>
        </Card>

        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 300, marginBottom: '1.5rem' }} data-testid="text-history-title">История маршрутов</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {mockRoutes.map((route, index) => (
              <Card
                key={route.id}
                hover
                onClick={() => console.log(`Clicked route ${route.id}`)}
                data-testid={`card-route-${index}`}
                style={{ padding: '1.5rem', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }} data-testid={`text-route-name-${index}`}>
                      {route.name}
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }} className="text-small text-muted">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Calendar style={{ width: '1rem', height: '1rem' }} />
                        <span data-testid={`text-route-date-${index}`}>{route.date}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <MapPin style={{ width: '1rem', height: '1rem' }} />
                        <span data-testid={`text-route-points-${index}`}>{route.points} точек</span>
                      </div>
                    </div>
                  </div>
                  <div style={{
                    width: '4rem',
                    height: '4rem',
                    backgroundColor: 'rgba(118, 182, 117, 0.1)',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <MapPin style={{ width: '2rem', height: '2rem', color: 'hsl(118, 52%, 50%)' }} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
