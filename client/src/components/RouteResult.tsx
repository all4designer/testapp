import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Share2, Save, MapPin, Car, Bus, Footprints, Clock, Navigation } from "lucide-react";
import cathedralImage from "@assets/generated_images/Rostov_cathedral_landmark_photo_46e25bfb.png";
import riverImage from "@assets/generated_images/Don_River_nature_landscape_828c778c.png";
import fortressImage from "@assets/generated_images/Azov_fortress_historical_site_3ced1d25.png";
import seafrontImage from "@assets/generated_images/Taganrog_seafront_promenade_view_1e4aaf61.png";
import restaurantImage from "@assets/generated_images/Traditional_restaurant_dining_experience_34b000ea.png";

const mockAttractions = [
  {
    id: 1,
    name: "Ростовский кафедральный собор",
    category: "История",
    description: "Величественный православный храм с золотыми куполами в центре города",
    image: cathedralImage,
    duration: "45 мин"
  },
  {
    id: 2,
    name: "Набережная реки Дон",
    category: "Природа",
    description: "Живописная прогулочная зона вдоль главной реки региона",
    image: riverImage,
    duration: "1 час"
  },
  {
    id: 3,
    name: "Азовская крепость",
    category: "История",
    description: "Древнее оборонительное сооружение с богатой историей",
    image: fortressImage,
    duration: "1.5 часа"
  },
  {
    id: 4,
    name: "Таганрогская набережная",
    category: "Отдых",
    description: "Морской променад с кафе и смотровыми площадками",
    image: seafrontImage,
    duration: "1 час"
  },
  {
    id: 5,
    name: "Ресторан донской кухни",
    category: "Гастрономия",
    description: "Традиционные блюда казачьей кухни в аутентичной атмосфере",
    image: restaurantImage,
    duration: "1.5 часа"
  }
];

const routeTypes = [
  { 
    id: "walk", 
    name: "Пешком", 
    icon: Footprints,
    totalTime: "6 часов 15 минут",
    distance: "8.5 км"
  },
  { 
    id: "bus", 
    name: "На автобусе", 
    icon: Bus,
    totalTime: "4 часа 30 минут",
    distance: "12 км"
  },
  { 
    id: "car", 
    name: "На машине", 
    icon: Car,
    totalTime: "3 часа 45 минут",
    distance: "15 км"
  }
];

export default function RouteResult() {
  const [activeRouteType, setActiveRouteType] = useState("walk");
  const [routeData, setRouteData] = useState<any>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("routeData");
    if (savedData) {
      setRouteData(JSON.parse(savedData));
    }
  }, []);

  const handleSave = () => {
    console.log("Route saved");
  };

  const handleShare = () => {
    console.log("Route shared");
  };

  const activeRoute = routeTypes.find(r => r.id === activeRouteType);

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Navigation className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-light mb-2" data-testid="text-result-title">
                Ваш персональный маршрут
              </h1>
              {routeData && (
                <p className="text-muted-foreground">
                  {routeData.startPoint?.name} → {routeData.endPoint?.name}
                </p>
              )}
            </div>
          </div>

          <Card className="p-6 mb-6">
            <div className="flex flex-wrap gap-3 mb-4">
              {routeTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <Button
                    key={type.id}
                    variant={activeRouteType === type.id ? "default" : "outline"}
                    onClick={() => setActiveRouteType(type.id)}
                    className="flex-1 min-w-[140px]"
                    data-testid={`button-route-type-${index}`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {type.name}
                  </Button>
                );
              })}
            </div>

            {activeRoute && (
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{activeRoute.totalTime}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Navigation className="w-4 h-4" />
                  <span>{activeRoute.distance}</span>
                </div>
              </div>
            )}
          </Card>

          <div className="flex flex-wrap gap-3">
            <Button variant="default" onClick={handleSave} data-testid="button-save-route">
              <Save className="w-4 h-4 mr-2" />
              Сохранить маршрут
            </Button>
            <Button variant="outline" onClick={handleShare} data-testid="button-share-route">
              <Share2 className="w-4 h-4 mr-2" />
              Поделиться
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-light mb-4">Точки маршрута</h2>
          
          {mockAttractions.map((attraction, index) => (
            <Card
              key={attraction.id}
              className="overflow-hidden hover-elevate active-elevate-2 transition-all"
              data-testid={`card-attraction-${index}`}
            >
              <div className="flex flex-col sm:flex-row gap-4 p-4">
                <div className="w-full sm:w-48 aspect-[4/3] rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={attraction.image}
                    alt={attraction.name}
                    className="w-full h-full object-cover"
                    data-testid={`img-attraction-${index}`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        {index + 1}
                      </div>
                      <h3 className="font-semibold text-lg" data-testid={`text-attraction-name-${index}`}>
                        {attraction.name}
                      </h3>
                    </div>
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline" data-testid={`badge-category-${index}`}>
                      {attraction.category}
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                      <Clock className="w-3 h-3" />
                      {attraction.duration}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground" data-testid={`text-attraction-description-${index}`}>
                    {attraction.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
