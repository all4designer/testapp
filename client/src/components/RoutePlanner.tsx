import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation } from "lucide-react";
import InteractiveMap from "./InteractiveMap";

interface RoutePlannerProps {
  onPlanRoute?: (data: RouteData) => void;
}

interface RouteData {
  startPoint: { lat: number; lng: number; name: string } | null;
  endPoint: { lat: number; lng: number; name: string } | null;
  budget: number;
  selectedStyles: string[];
}

const travelStyles = [
  "Семейный",
  "Активный",
  "Культурный",
  "Романтический",
  "Гастрономический",
  "Фотографический"
];

const budgetLevels = [
  { value: 0, label: "Эконом", color: "hsl(var(--muted))" },
  { value: 1, label: "Комфорт", color: "hsl(var(--primary) / 0.5)" },
  { value: 2, label: "Премиум", color: "hsl(var(--primary))" }
];

export default function RoutePlanner({ onPlanRoute }: RoutePlannerProps) {
  const [startPoint, setStartPoint] = useState<{ lat: number; lng: number; name: string } | null>(null);
  const [endPoint, setEndPoint] = useState<{ lat: number; lng: number; name: string } | null>(null);
  const [budget, setBudget] = useState(1);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [mapMode, setMapMode] = useState<'start' | 'end' | null>(null);

  const toggleStyle = (style: string) => {
    setSelectedStyles(prev =>
      prev.includes(style)
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  const handleLocationSelect = (location: { lat: number; lng: number; name: string }) => {
    if (mapMode === 'start') {
      setStartPoint(location);
      setMapMode('end');
    } else if (mapMode === 'end') {
      setEndPoint(location);
      setMapMode(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startPoint && endPoint) {
      onPlanRoute?.({ startPoint, endPoint, budget, selectedStyles });
    }
  };

  const getBudgetColor = (value: number) => {
    const level = budgetLevels.find(l => l.value === value);
    return level?.color || budgetLevels[1].color;
  };

  return (
    <div className="h-screen pt-16 flex">
      <aside className="w-full md:w-96 lg:w-[28rem] bg-card border-r border-card-border overflow-y-auto">
        <div className="p-6 space-y-6">
          <div>
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl mb-4">
              <Navigation className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-2xl font-light mb-2" data-testid="text-planner-title">
              Спланировать маршрут
            </h1>
            <p className="text-sm text-muted-foreground" data-testid="text-planner-subtitle">
              Выберите точки на карте и настройте параметры
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label>Точки маршрута</Label>
              
              <Button
                type="button"
                variant={mapMode === 'start' ? 'default' : startPoint ? 'outline' : 'secondary'}
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => setMapMode('start')}
                data-testid="button-select-start"
              >
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground mb-0.5">Начальная точка</div>
                  <div className="text-sm truncate">
                    {startPoint ? startPoint.name : 'Нажмите, чтобы выбрать на карте'}
                  </div>
                </div>
              </Button>

              <Button
                type="button"
                variant={mapMode === 'end' ? 'default' : endPoint ? 'outline' : 'secondary'}
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => setMapMode('end')}
                data-testid="button-select-end"
              >
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground mb-0.5">Конечная точка</div>
                  <div className="text-sm truncate">
                    {endPoint ? endPoint.name : 'Нажмите, чтобы выбрать на карте'}
                  </div>
                </div>
              </Button>
            </div>

            <div className="space-y-4">
              <Label>Бюджет поездки</Label>
              <div className="relative pt-2 pb-8">
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="1"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="magnetic-slider"
                  data-testid="slider-budget"
                  style={{
                    background: `linear-gradient(to right, ${getBudgetColor(budget)} 0%, ${getBudgetColor(budget)} ${(budget / 2) * 100}%, hsl(var(--muted)) ${(budget / 2) * 100}%, hsl(var(--muted)) 100%)`
                  }}
                />
                <div className="flex justify-between mt-3">
                  {budgetLevels.map((level, index) => (
                    <span 
                      key={level.value}
                      className={`text-xs transition-all ${budget === level.value ? 'text-foreground font-semibold scale-110' : 'text-muted-foreground'}`}
                      data-testid={`text-budget-${index}`}
                    >
                      {level.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
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

            <Button 
              type="submit" 
              className="w-full" 
              size="lg" 
              disabled={!startPoint || !endPoint}
              data-testid="button-build-route"
            >
              Построить маршрут
            </Button>
          </form>
        </div>
      </aside>

      <main className="flex-1 relative">
        <InteractiveMap
          onLocationSelect={handleLocationSelect}
          startPoint={startPoint}
          endPoint={endPoint}
          mode={mapMode}
        />
      </main>

      <style>{`
        .magnetic-slider {
          width: 100%;
          height: 8px;
          border-radius: 999px;
          outline: none;
          -webkit-appearance: none;
          appearance: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .magnetic-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: hsl(var(--primary));
          cursor: pointer;
          border: 3px solid hsl(var(--card));
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .magnetic-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
        }

        .magnetic-slider::-webkit-slider-thumb:active {
          transform: scale(1.1);
        }

        .magnetic-slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: hsl(var(--primary));
          cursor: pointer;
          border: 3px solid hsl(var(--card));
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .magnetic-slider::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
        }

        .magnetic-slider::-moz-range-thumb:active {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}
