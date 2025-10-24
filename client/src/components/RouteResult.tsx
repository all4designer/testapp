import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Share2, Save, MapPin, Car, Bus, Footprints, Clock, Navigation, DollarSign, Menu } from "lucide-react";
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
    duration: "45 мин",
    lat: 47.2313,
    lng: 39.7233,
    price: "Бесплатно",
    bestTime: "Утро (9:00-12:00)"
  },
  {
    id: 2,
    name: "Набережная реки Дон",
    category: "Природа",
    description: "Живописная прогулочная зона вдоль главной реки региона",
    image: riverImage,
    duration: "1 час",
    lat: 47.2280,
    lng: 39.7100,
    price: "Бесплатно",
    bestTime: "Вечер (18:00-20:00)"
  },
  {
    id: 3,
    name: "Азовская крепость",
    category: "История",
    description: "Древнее оборонительное сооружение с богатой историей",
    image: fortressImage,
    duration: "1.5 часа",
    lat: 47.1089,
    lng: 39.4165,
    price: "200 ₽",
    bestTime: "День (12:00-16:00)"
  },
  {
    id: 4,
    name: "Таганрогская набережная",
    category: "Отдых",
    description: "Морской променад с кафе и смотровыми площадками",
    image: seafrontImage,
    duration: "1 час",
    lat: 47.2038,
    lng: 38.9344,
    price: "Бесплатно",
    bestTime: "Закат (19:00-21:00)"
  },
  {
    id: 5,
    name: "Ресторан донской кухни",
    category: "Гастрономия",
    description: "Традиционные блюда казачьей кухни в аутентичной атмосфере",
    image: restaurantImage,
    duration: "1.5 часа",
    lat: 47.2220,
    lng: 39.7180,
    price: "800-1500 ₽",
    bestTime: "Обед (13:00-15:00)"
  }
];

const routeTypes = [
  { 
    id: "walk", 
    name: "Пешком", 
    icon: Footprints,
    totalTime: "6 часов 15 минут",
    distance: "8.5 км",
    cost: "0 ₽"
  },
  { 
    id: "bus", 
    name: "На автобусе", 
    icon: Bus,
    totalTime: "4 часа 30 минут",
    distance: "12 км",
    cost: "150 ₽"
  },
  { 
    id: "car", 
    name: "На машине", 
    icon: Car,
    totalTime: "3 часа 45 минут",
    distance: "15 км",
    cost: "350 ₽"
  }
];

export default function RouteResult() {
  const [activeRouteType, setActiveRouteType] = useState("walk");
  const [routeData, setRouteData] = useState<any>(null);
  const [selectedAttraction, setSelectedAttraction] = useState<number | null>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem("routeData");
    if (savedData) {
      setRouteData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = () => {
      if (typeof window === 'undefined' || !(window as any).ymaps) return;

      (window as any).ymaps.ready(() => {
        const map = new (window as any).ymaps.Map(mapRef.current, {
          center: [47.2357, 39.7015],
          zoom: 10,
          controls: ['zoomControl']
        });

        markersRef.current.forEach((marker: any) => {
          if (marker) map.geoObjects.remove(marker);
        });
        markersRef.current = [];

        if (routeData?.startPoint) {
          const startMarker = new (window as any).ymaps.Placemark(
            [routeData.startPoint.lat, routeData.startPoint.lng],
            {
              balloonContent: `<strong>Начало:</strong><br/>${routeData.startPoint.name}`,
              iconContent: 'А'
            },
            {
              preset: 'islands#greenStretchyIcon'
            }
          );
          map.geoObjects.add(startMarker);
          markersRef.current.push(startMarker);
        }

        if (routeData?.endPoint) {
          const endMarker = new (window as any).ymaps.Placemark(
            [routeData.endPoint.lat, routeData.endPoint.lng],
            {
              balloonContent: `<strong>Конец:</strong><br/>${routeData.endPoint.name}`,
              iconContent: 'Б'
            },
            {
              preset: 'islands#redStretchyIcon'
            }
          );
          map.geoObjects.add(endMarker);
          markersRef.current.push(endMarker);
        }

        mockAttractions.forEach((attraction, index) => {
          const marker = new (window as any).ymaps.Placemark(
            [attraction.lat, attraction.lng],
            {
              balloonContent: `<strong>${attraction.name}</strong><br/>${attraction.category}`,
              iconContent: String(index + 1)
            },
            {
              preset: 'islands#blueStretchyIcon'
            }
          );
          map.geoObjects.add(marker);
          markersRef.current.push(marker);
        });

        setMapInstance(map);
      });
    };

    if ((window as any).ymaps) {
      initMap();
    } else {
      const checkYmaps = setInterval(() => {
        if ((window as any).ymaps) {
          clearInterval(checkYmaps);
          initMap();
        }
      }, 100);

      return () => clearInterval(checkYmaps);
    }
  }, [routeData]);

  const handleAttractionClick = (attraction: typeof mockAttractions[0], index: number) => {
    setSelectedAttraction(index);
    
    if (mapInstance) {
      mapInstance.setCenter([attraction.lat, attraction.lng], 14, {
        duration: 500
      });
    }
  };

  const handleSave = () => {
    console.log("Route saved");
  };

  const handleShare = () => {
    console.log("Route shared");
  };

  const activeRoute = routeTypes.find(r => r.id === activeRouteType);

  const ResultContent = () => (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-2xl mb-3">
          <Navigation className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-2xl font-light mb-2" data-testid="text-result-title">
          Ваш персональный маршрут
        </h1>
        {routeData && (
          <p className="text-sm text-muted-foreground">
            {routeData.startPoint?.name} → {routeData.endPoint?.name}
          </p>
        )}
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {routeTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <Button
                key={type.id}
                variant={activeRouteType === type.id ? "default" : "outline"}
                onClick={() => setActiveRouteType(type.id)}
                size="sm"
                className="flex-1 min-w-[100px]"
                data-testid={`button-route-type-${index}`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {type.name}
              </Button>
            );
          })}
        </div>

        {activeRoute && (
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{activeRoute.totalTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Navigation className="w-4 h-4" />
              <span>{activeRoute.distance}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4" />
              <span>{activeRoute.cost}</span>
            </div>
          </div>
        )}
      </Card>

      <div className="flex gap-2">
        <Button variant="default" size="sm" onClick={handleSave} className="flex-1" data-testid="button-save-route">
          <Save className="w-4 h-4 mr-2" />
          Сохранить
        </Button>
        <Button variant="outline" size="sm" onClick={handleShare} className="flex-1" data-testid="button-share-route">
          <Share2 className="w-4 h-4 mr-2" />
          Поделиться
        </Button>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-3">Точки маршрута</h2>
        
        <div className="space-y-3">
          {mockAttractions.map((attraction, index) => (
            <Card
              key={attraction.id}
              className={`overflow-hidden cursor-pointer hover-elevate active-elevate-2 transition-all ${
                selectedAttraction === index ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleAttractionClick(attraction, index)}
              data-testid={`card-attraction-${index}`}
            >
              <div className="flex gap-3 p-3">
                <div className="w-20 aspect-square rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={attraction.image}
                    alt={attraction.name}
                    className="w-full h-full object-cover"
                    data-testid={`img-attraction-${index}`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold flex-shrink-0">
                      {index + 1}
                    </div>
                    <h3 className="font-medium text-sm leading-tight" data-testid={`text-attraction-name-${index}`}>
                      {attraction.name}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <Badge variant="outline" className="text-xs" data-testid={`badge-category-${index}`}>
                      {attraction.category}
                    </Badge>
                    <Badge variant="secondary" className="text-xs gap-1">
                      <Clock className="w-3 h-3" />
                      {attraction.duration}
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2" data-testid={`text-attraction-description-${index}`}>
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

  return (
    <div className="h-screen pt-16 flex flex-col md:flex-row overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-96 lg:w-[32rem] bg-card border-r border-card-border overflow-y-auto">
        <div className="p-6">
          <ResultContent />
        </div>
      </aside>

      {/* Map Container */}
      <main className="flex-1 relative flex flex-col">
        <div ref={mapRef} className="flex-1 w-full" data-testid="yandex-map" />
        
        {/* Desktop Bottom Panel for Selected Attraction */}
        {selectedAttraction !== null && (
          <div className="hidden md:block absolute bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-card-border p-4">
            <div className="flex gap-4 items-start">
              <div className="w-24 aspect-square rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={mockAttractions[selectedAttraction].image}
                  alt={mockAttractions[selectedAttraction].name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-lg">{mockAttractions[selectedAttraction].name}</h3>
                  <Badge variant="default">{mockAttractions[selectedAttraction].category}</Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">
                  {mockAttractions[selectedAttraction].description}
                </p>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Длительность</div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="font-medium">{mockAttractions[selectedAttraction].duration}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Стоимость</div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-primary" />
                      <span className="font-medium">{mockAttractions[selectedAttraction].price}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Лучшее время</div>
                    <div className="font-medium text-xs">{mockAttractions[selectedAttraction].bestTime}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Sheet */}
        <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
          <SheetTrigger asChild>
            <Button
              size="lg"
              className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 shadow-lg"
              data-testid="button-open-mobile-result"
            >
              <Menu className="w-5 h-5 mr-2" />
              Детали маршрута
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh] md:hidden overflow-y-auto">
            <SheetHeader className="mb-6">
              <SheetTitle className="sr-only">Детали маршрута</SheetTitle>
            </SheetHeader>
            <ResultContent />
          </SheetContent>
        </Sheet>
      </main>
    </div>
  );
}
