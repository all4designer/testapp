import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

interface RoutePlannerProps {
  onPlanRoute?: () => void;
}

const locations = [
  "Ростов-на-Дону",
  "Таганрог",
  "Азов",
  "Новочеркасск",
  "Шахты",
  "Батайск",
  "Аксай",
  "Старочеркасск"
];

const travelStyles = [
  "Семейный",
  "Активный",
  "Культурный",
  "Романтический",
  "Гастрономический",
  "Фотографический"
];

const budgetLevels = ["Эконом", "Комфорт", "Премиум"];

export default function RoutePlanner({ onPlanRoute }: RoutePlannerProps) {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [budget, setBudget] = useState([1]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  const toggleStyle = (style: string) => {
    setSelectedStyles(prev =>
      prev.includes(style)
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Route planned:", { startLocation, endLocation, budget: budgetLevels[budget[0]], selectedStyles });
    onPlanRoute?.();
  };

  return (
    <div className="min-h-screen relative bg-muted/30">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ 
          backgroundImage: `url(https://static-maps.yandex.ru/1.x/?ll=39.7,47.2&z=8&l=map&size=600,400)`,
          filter: 'grayscale(0.3)'
        }}
      />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-2xl bg-card/95 backdrop-blur-xl border border-card-border rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-light mb-2" data-testid="text-planner-title">
              Спланировать маршрут
            </h1>
            <p className="text-muted-foreground" data-testid="text-planner-subtitle">
              Создайте персональный маршрут по Ростовской области
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start">Начальная точка</Label>
                <Select value={startLocation} onValueChange={setStartLocation}>
                  <SelectTrigger id="start" data-testid="select-start-location">
                    <SelectValue placeholder="Выберите город" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="end">Конечная точка</Label>
                <Select value={endLocation} onValueChange={setEndLocation}>
                  <SelectTrigger id="end" data-testid="select-end-location">
                    <SelectValue placeholder="Выберите город" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Бюджет поездки</Label>
              <div className="space-y-2">
                <Slider
                  value={budget}
                  onValueChange={setBudget}
                  max={2}
                  step={1}
                  className="w-full"
                  data-testid="slider-budget"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  {budgetLevels.map((level, index) => (
                    <span 
                      key={level}
                      className={budget[0] === index ? "text-foreground font-medium" : ""}
                      data-testid={`text-budget-${index}`}
                    >
                      {level}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Стиль путешествия</Label>
              <div className="flex flex-wrap gap-2">
                {travelStyles.map((style, index) => (
                  <Badge
                    key={style}
                    variant={selectedStyles.includes(style) ? "default" : "outline"}
                    className="cursor-pointer hover-elevate active-elevate-2"
                    onClick={() => toggleStyle(style)}
                    data-testid={`badge-style-${index}`}
                  >
                    {style}
                  </Badge>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" data-testid="button-build-route">
              Построить маршрут
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
