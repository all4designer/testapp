import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MapPin, Navigation, Menu } from "lucide-react";
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
  const [startText, setStartText] = useState("");
  const [endText, setEndText] = useState("");
  const [budget, setBudget] = useState(1);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [mapMode, setMapMode] = useState<'start' | 'end' | null>(null);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

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
      setStartText(location.name);
      setMapMode(null);
    } else if (mapMode === 'end') {
      setEndPoint(location);
      setEndText(location.name);
      setMapMode(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalStart = startPoint || (startText ? {
      lat: 47.2357,
      lng: 39.7015,
      name: startText
    } : null);
    
    const finalEnd = endPoint || (endText ? {
      lat: 47.2357,
      lng: 39.7015,
      name: endText
    } : null);
    
    if (finalStart && finalEnd) {
      onPlanRoute?.({ startPoint: finalStart, endPoint: finalEnd, budget, selectedStyles });
    }
  };

  const getBudgetColor = (value: number) => {
    const level = budgetLevels.find(l => l.value === value);
    return level?.color || budgetLevels[1].color;
  };

  const PlannerForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <Label>Точки маршрута</Label>
        
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Начальная точка</Label>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Введите адрес или место"
              value={startText}
              onChange={(e) => setStartText(e.target.value)}
              data-testid="input-start"
              className="flex-1"
            />
            <Button
              type="button"
              variant={mapMode === 'start' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setMapMode(mapMode === 'start' ? null : 'start')}
              data-testid="button-select-start"
              title="Выбрать на карте"
            >
              <MapPin className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Конечная точка</Label>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Введите адрес или место"
              value={endText}
              onChange={(e) => setEndText(e.target.value)}
              data-testid="input-end"
              className="flex-1"
            />
            <Button
              type="button"
              variant={mapMode === 'end' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setMapMode(mapMode === 'end' ? null : 'end')}
              data-testid="button-select-end"
              title="Выбрать на карте"
            >
              <MapPin className="w-4 h-4" />
            </Button>
          </div>
        </div>
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
        disabled={(!startPoint && !startText) || (!endPoint && !endText)}
        data-testid="button-build-route"
      >
        Построить маршрут
      </Button>
    </form>
  );

  return (
    <div className="h-screen pt-16 flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-96 lg:w-[28rem] bg-card border-r border-card-border overflow-y-auto">
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

          <PlannerForm />
        </div>
      </aside>

      {/* Map Container */}
      <main className="flex-1 relative">
        <InteractiveMap
          onLocationSelect={handleLocationSelect}
          startPoint={startPoint}
          endPoint={endPoint}
          mode={mapMode}
        />

        {/* Mobile Sheet Trigger */}
        <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
          <SheetTrigger asChild>
            <Button
              size="lg"
              className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 shadow-lg"
              data-testid="button-open-mobile-planner"
            >
              <Menu className="w-5 h-5 mr-2" />
              Спланировать маршрут
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh] md:hidden overflow-y-auto">
            <SheetHeader className="mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Navigation className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <SheetTitle className="text-xl font-light">Спланировать маршрут</SheetTitle>
                  <p className="text-sm text-muted-foreground">Выберите точки и параметры</p>
                </div>
              </div>
            </SheetHeader>
            <PlannerForm />
          </SheetContent>
        </Sheet>
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
