import { useState } from "react";
import { Button } from "@/components/ui-scss/Button";
import { Label } from "@/components/ui-scss/Label";
import { Badge } from "@/components/ui-scss/Badge";
import { Input } from "@/components/ui-scss/Input";
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
  { value: 0, label: "Эконом", color: "hsl(118, 4%, 92%)" },
  { value: 1, label: "Комфорт", color: "hsl(118, 52%, 50%, 0.5)" },
  { value: 2, label: "Премиум", color: "hsl(118, 52%, 50%)" }
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
    <form onSubmit={handleSubmit} className="route-planner__form">
      <div className="route-planner__field-group">
        <Label>Точки маршрута</Label>
        
        <div className="route-planner__field">
          <Label size="sm">Начальная точка</Label>
          <div className="route-planner__input-row">
            <Input
              type="text"
              placeholder="Введите адрес или место"
              value={startText}
              onChange={(e) => setStartText(e.target.value)}
              data-testid="input-start"
            />
            <Button
              type="button"
              variant={mapMode === 'start' ? 'primary' : 'outline'}
              size="icon"
              onClick={() => setMapMode(mapMode === 'start' ? null : 'start')}
              data-testid="button-select-start"
              title="Выбрать на карте"
            >
              <MapPin />
            </Button>
          </div>
        </div>

        <div className="route-planner__field">
          <Label size="sm">Конечная точка</Label>
          <div className="route-planner__input-row">
            <Input
              type="text"
              placeholder="Введите адрес или место"
              value={endText}
              onChange={(e) => setEndText(e.target.value)}
              data-testid="input-end"
            />
            <Button
              type="button"
              variant={mapMode === 'end' ? 'primary' : 'outline'}
              size="icon"
              onClick={() => setMapMode(mapMode === 'end' ? null : 'end')}
              data-testid="button-select-end"
              title="Выбрать на карте"
            >
              <MapPin />
            </Button>
          </div>
        </div>
      </div>

      <div className="route-planner__field-group">
        <Label>Бюджет поездки</Label>
        <div className="route-planner__budget-slider">
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
              background: `linear-gradient(to right, ${getBudgetColor(budget)} 0%, ${getBudgetColor(budget)} ${(budget / 2) * 100}%, hsl(118, 4%, 92%) ${(budget / 2) * 100}%, hsl(118, 4%, 92%) 100%)`
            }}
          />
          <div className="route-planner__budget-labels">
            {budgetLevels.map((level, index) => (
              <span 
                key={level.value}
                className={`route-planner__budget-label ${budget === level.value ? 'active' : ''}`}
                data-testid={`text-budget-${index}`}
              >
                {level.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="route-planner__field-group">
        <Label>Стиль путешествия</Label>
        <div className="route-planner__styles">
          {travelStyles.map((style, index) => (
            <Badge
              key={style}
              variant={selectedStyles.includes(style) ? "primary" : "outline"}
              hover
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
        size="lg" 
        disabled={(!startPoint && !startText) || (!endPoint && !endText)}
        data-testid="button-build-route"
        style={{ width: '100%' }}
      >
        Построить маршрут
      </Button>
    </form>
  );

  return (
    <div className="route-planner">
      {/* Desktop Sidebar */}
      <aside className="route-planner__sidebar">
        <div className="route-planner__content">
          <div className="route-planner__header">
            <div className="route-planner__header-icon">
              <Navigation />
            </div>
            <h1 className="route-planner__header-title" data-testid="text-planner-title">
              Спланировать маршрут
            </h1>
            <p className="route-planner__header-subtitle" data-testid="text-planner-subtitle">
              Выберите точки на карте и настройте параметры
            </p>
          </div>

          <PlannerForm />
        </div>
      </aside>

      {/* Map Container */}
      <main className="route-planner__map-container">
        <InteractiveMap
          onLocationSelect={handleLocationSelect}
          startPoint={startPoint}
          endPoint={endPoint}
          mode={mapMode}
        />

        {/* Mobile Sheet Trigger */}
        <Button
          size="lg"
          className="route-planner__mobile-trigger"
          onClick={() => setMobileSheetOpen(!mobileSheetOpen)}
          data-testid="button-open-mobile-planner"
        >
          <Menu />
          Спланировать маршрут
        </Button>

        {/* Mobile Sheet */}
        {mobileSheetOpen && (
          <div className="sheet__overlay" onClick={() => setMobileSheetOpen(false)}>
            <div className="sheet__content sheet__content--bottom" onClick={(e) => e.stopPropagation()}>
              <div className="sheet__header">
                <div className="sheet__header-inner">
                  <div className="sheet__header-icon">
                    <Navigation />
                  </div>
                  <div className="sheet__header-text">
                    <h2>Спланировать маршрут</h2>
                    <p>Выберите точки и параметры</p>
                  </div>
                </div>
              </div>
              <PlannerForm />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
