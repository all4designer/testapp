import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">ИИ</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl font-semibold mb-1" data-testid="text-user-name">Иван Иванов</h1>
              <p className="text-muted-foreground" data-testid="text-user-email">ivan@example.com</p>
            </div>
            <Link href="/plan" data-testid="link-create-route">
              <Button data-testid="button-create-route">Создать маршрут</Button>
            </Link>
          </div>
        </Card>

        <div>
          <h2 className="text-2xl font-light mb-6" data-testid="text-history-title">История маршрутов</h2>
          <div className="grid gap-4">
            {mockRoutes.map((route, index) => (
              <Card
                key={route.id}
                className="p-6 hover-elevate active-elevate-2 cursor-pointer transition-all"
                onClick={() => console.log(`Clicked route ${route.id}`)}
                data-testid={`card-route-${index}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2" data-testid={`text-route-name-${index}`}>
                      {route.name}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span data-testid={`text-route-date-${index}`}>{route.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span data-testid={`text-route-points-${index}`}>{route.points} точек</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-primary" />
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
