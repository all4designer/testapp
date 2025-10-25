import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui-scss/Button";
import { Card } from "@/components/ui-scss/Card";
import { Badge } from "@/components/ui-scss/Badge";
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '3rem',
          height: '3rem',
          backgroundColor: 'rgba(118, 182, 117, 0.1)',
          borderRadius: '1rem',
          marginBottom: '0.75rem'
        }}>
          <Navigation style={{ width: '1.5rem', height: '1.5rem', color: 'hsl(118, 52%, 50%)' }} />
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 300, marginBottom: '0.5rem' }} data-testid="text-result-title">
          Ваш персональный маршрут
        </h1>
        {routeData && (
          <p className="text-small text-muted">
            {routeData.startPoint?.name} → {routeData.endPoint?.name}
          </p>
        )}
      </div>

      <Card style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
          {routeTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <Button
                key={type.id}
                variant={activeRouteType === type.id ? "primary" : "outline"}
                onClick={() => setActiveRouteType(type.id)}
                size="sm"
                style={{ flex: '1 1 100px', minWidth: '100px' }}
                data-testid={`button-route-type-${index}`}
              >
                <Icon style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                {type.name}
              </Button>
            );
          })}
        </div>

        {activeRoute && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }} className="text-small text-muted">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <Clock style={{ width: '1rem', height: '1rem' }} />
              <span>{activeRoute.totalTime}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <Navigation style={{ width: '1rem', height: '1rem' }} />
              <span>{activeRoute.distance}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <DollarSign style={{ width: '1rem', height: '1rem' }} />
              <span>{activeRoute.cost}</span>
            </div>
          </div>
        )}
      </Card>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button variant="primary" size="sm" onClick={handleSave} style={{ flex: 1 }} data-testid="button-save-route">
          <Save style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
          Сохранить
        </Button>
        <Button variant="outline" size="sm" onClick={handleShare} style={{ flex: 1 }} data-testid="button-share-route">
          <Share2 style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
          Поделиться
        </Button>
      </div>

      <div>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 500, marginBottom: '0.75rem' }}>Точки маршрута</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {mockAttractions.map((attraction, index) => (
            <Card
              key={attraction.id}
              hover
              onClick={() => handleAttractionClick(attraction, index)}
              data-testid={`card-attraction-${index}`}
              style={{
                overflow: 'hidden',
                cursor: 'pointer',
                outline: selectedAttraction === index ? '2px solid hsl(118, 52%, 50%)' : 'none'
              }}
            >
              <div style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem' }}>
                <div style={{ width: '5rem', aspectRatio: '1', borderRadius: '0.5rem', overflow: 'hidden', flexShrink: 0 }}>
                  <img
                    src={attraction.image}
                    alt={attraction.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    data-testid={`img-attraction-${index}`}
                  />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <div style={{
                      width: '1.5rem',
                      height: '1.5rem',
                      borderRadius: '50%',
                      backgroundColor: 'hsl(118, 52%, 50%)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      flexShrink: 0
                    }}>
                      {index + 1}
                    </div>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.3 }} data-testid={`text-attraction-name-${index}`}>
                      {attraction.name}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '0.5rem' }}>
                    <Badge variant="outline" data-testid={`badge-category-${index}`}>
                      {attraction.category}
                    </Badge>
                    <Badge variant="secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock style={{ width: '0.75rem', height: '0.75rem' }} />
                      {attraction.duration}
                    </Badge>
                  </div>

                  <p className="text-small text-muted" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }} data-testid={`text-attraction-description-${index}`}>
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
    <div className="route-result">
      {/* Desktop Sidebar */}
      <aside className="route-result__sidebar">
        <ResultContent />
      </aside>

      {/* Map Container */}
      <main className="route-result__map-container">
        <div ref={mapRef} data-testid="yandex-map" />
        
        {/* Desktop Bottom Panel for Selected Attraction */}
        {selectedAttraction !== null && (
          <div className={`route-result__detail-panel ${selectedAttraction !== null ? 'active' : ''}`}>
            <div className="route-result__detail-content">
              <div className="route-result__detail-image">
                <img
                  src={mockAttractions[selectedAttraction].image}
                  alt={mockAttractions[selectedAttraction].name}
                />
              </div>
              
              <div className="route-result__detail-body">
                <div className="route-result__detail-header">
                  <h3>{mockAttractions[selectedAttraction].name}</h3>
                  <Badge variant="primary">{mockAttractions[selectedAttraction].category}</Badge>
                </div>
                
                <p className="route-result__detail-description">
                  {mockAttractions[selectedAttraction].description}
                </p>
                
                <div className="route-result__detail-meta">
                  <div className="route-result__meta-item">
                    <div className="route-result__meta-item-label">Длительность</div>
                    <div className="route-result__meta-item-value">
                      <Clock />
                      <span>{mockAttractions[selectedAttraction].duration}</span>
                    </div>
                  </div>
                  <div className="route-result__meta-item">
                    <div className="route-result__meta-item-label">Стоимость</div>
                    <div className="route-result__meta-item-value">
                      <DollarSign />
                      <span>{mockAttractions[selectedAttraction].price}</span>
                    </div>
                  </div>
                  <div className="route-result__meta-item">
                    <div className="route-result__meta-item-label">Лучшее время</div>
                    <div className="route-result__meta-item-time">{mockAttractions[selectedAttraction].bestTime}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Sheet Trigger */}
        <Button
          size="lg"
          className="route-result__mobile-trigger"
          onClick={() => setMobileSheetOpen(!mobileSheetOpen)}
          data-testid="button-open-mobile-result"
        >
          <Menu />
          Детали маршрута
        </Button>

        {/* Mobile Sheet */}
        {mobileSheetOpen && (
          <div className="sheet__overlay" onClick={() => setMobileSheetOpen(false)}>
            <div className="sheet__content sheet__content--bottom" onClick={(e) => e.stopPropagation()}>
              <div className="sheet__header">
                <h2>Детали маршрута</h2>
              </div>
              <ResultContent />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
