import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

interface InteractiveMapProps {
  onLocationSelect?: (location: { lat: number; lng: number; name: string }) => void;
  startPoint?: { lat: number; lng: number; name: string } | null;
  endPoint?: { lat: number; lng: number; name: string } | null;
  mode?: 'start' | 'end' | null;
}

export default function InteractiveMap({ onLocationSelect, startPoint, endPoint, mode }: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [startMarker, setStartMarker] = useState<any>(null);
  const [endMarker, setEndMarker] = useState<any>(null);
  const onLocationSelectRef = useRef(onLocationSelect);

  useEffect(() => {
    onLocationSelectRef.current = onLocationSelect;
  }, [onLocationSelect]);

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = () => {
      if (typeof window === 'undefined' || !(window as any).ymaps) return;

      (window as any).ymaps.ready(() => {
        const map = new (window as any).ymaps.Map(mapRef.current, {
          center: [47.2357, 39.7015],
          zoom: 9,
          controls: ['zoomControl', 'geolocationControl']
        });

        map.events.add('click', (e: any) => {
          const coords = e.get('coords');
          
          (window as any).ymaps.geocode(coords).then((res: any) => {
            const firstGeoObject = res.geoObjects.get(0);
            const name = firstGeoObject.getAddressLine();

            if (onLocationSelectRef.current) {
              onLocationSelectRef.current({
                lat: coords[0],
                lng: coords[1],
                name: name
              });
            }
          });
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
  }, []);

  useEffect(() => {
    if (!mapInstance || !(window as any).ymaps) return;

    if (startPoint) {
      if (startMarker) {
        mapInstance.geoObjects.remove(startMarker);
      }

      const marker = new (window as any).ymaps.Placemark(
        [startPoint.lat, startPoint.lng],
        {
          balloonContent: `<strong>Начало:</strong><br/>${startPoint.name}`,
          iconContent: 'А'
        },
        {
          preset: 'islands#greenStretchyIcon'
        }
      );

      mapInstance.geoObjects.add(marker);
      setStartMarker(marker);
    }

    if (endPoint) {
      if (endMarker) {
        mapInstance.geoObjects.remove(endMarker);
      }

      const marker = new (window as any).ymaps.Placemark(
        [endPoint.lat, endPoint.lng],
        {
          balloonContent: `<strong>Конец:</strong><br/>${endPoint.name}`,
          iconContent: 'Б'
        },
        {
          preset: 'islands#blueStretchyIcon'
        }
      );

      mapInstance.geoObjects.add(marker);
      setEndMarker(marker);
    }

    if (startPoint && endPoint) {
      mapInstance.setBounds(
        [[startPoint.lat, startPoint.lng], [endPoint.lat, endPoint.lng]],
        { checkZoomRange: true, zoomMargin: 50 }
      );
    }
  }, [mapInstance, startPoint, endPoint]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full rounded-lg overflow-hidden" data-testid="yandex-map" />
      {mode && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-card/95 backdrop-blur-sm border border-card-border px-4 py-2 rounded-full shadow-lg">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span>
              {mode === 'start' ? 'Нажмите на карту, чтобы выбрать начальную точку' : 'Нажмите на карту, чтобы выбрать конечную точку'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
