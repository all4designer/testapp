import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Share2, Save, Plus, MapPin, Car, Bus, Footprints } from "lucide-react";
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
    image: cathedralImage
  },
  {
    id: 2,
    name: "Набережная реки Дон",
    category: "Природа",
    description: "Живописная прогулочная зона вдоль главной реки региона",
    image: riverImage
  },
  {
    id: 3,
    name: "Азовская крепость",
    category: "История",
    description: "Древнее оборонительное сооружение с богатой историей",
    image: fortressImage
  },
  {
    id: 4,
    name: "Таганрогская набережная",
    category: "Отдых",
    description: "Морской променад с кафе и смотровыми площадками",
    image: seafrontImage
  },
  {
    id: 5,
    name: "Ресторан донской кухни",
    category: "Гастрономия",
    description: "Традиционные блюда казачьей кухни в аутентичной атмосфере",
    image: restaurantImage
  }
];

const routeTypes = [
  { id: "walk", name: "Пешком", icon: Footprints },
  { id: "bus", name: "На автобусе", icon: Bus },
  { id: "car", name: "На машине", icon: Car }
];

export default function RouteResult() {
  const [activeRouteType, setActiveRouteType] = useState("walk");

  const handleSave = () => {
    console.log("Route saved");
  };

  const handleShare = () => {
    console.log("Route shared");
  };

  const handleAddStop = () => {
    console.log("Add stop clicked");
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-light mb-4" data-testid="text-result-title">
            Ваш персональный маршрут
          </h1>
          
          <div className="flex flex-wrap gap-3 mb-6">
            {routeTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <Button
                  key={type.id}
                  variant={activeRouteType === type.id ? "default" : "outline"}
                  onClick={() => setActiveRouteType(type.id)}
                  data-testid={`button-route-type-${index}`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {type.name}
                </Button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="default" onClick={handleSave} data-testid="button-save-route">
              <Save className="w-4 h-4 mr-2" />
              Сохранить маршрут
            </Button>
            <Button variant="outline" onClick={handleShare} data-testid="button-share-route">
              <Share2 className="w-4 h-4 mr-2" />
              Поделиться
            </Button>
            <Button variant="outline" onClick={handleAddStop} data-testid="button-add-stop">
              <Plus className="w-4 h-4 mr-2" />
              Добавить остановку
            </Button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAttractions.map((attraction, index) => (
            <Card
              key={attraction.id}
              className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer transition-all"
              onClick={() => console.log(`Clicked attraction ${attraction.id}`)}
              data-testid={`card-attraction-${index}`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={attraction.image}
                  alt={attraction.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  data-testid={`img-attraction-${index}`}
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-lg" data-testid={`text-attraction-name-${index}`}>
                    {attraction.name}
                  </h3>
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                </div>
                <Badge variant="outline" className="mb-3" data-testid={`badge-category-${index}`}>
                  {attraction.category}
                </Badge>
                <p className="text-sm text-muted-foreground" data-testid={`text-attraction-description-${index}`}>
                  {attraction.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
