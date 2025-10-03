import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';

interface MapLocation {
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  description?: string;
}

interface InteractiveMapProps {
  locations: MapLocation[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  showSearch?: boolean;
}

export const InteractiveMap = ({ 
  locations, 
  center = [77.5, 31.1], 
  zoom = 6,
  height = "h-[500px]",
  showSearch = false
}: InteractiveMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [needsToken, setNeedsToken] = useState<boolean>(false);

  useEffect(() => {
    // Check for Mapbox token (you can replace this with your token or add to Supabase secrets)
    const token = import.meta.env.VITE_MAPBOX_TOKEN || 'pk.eyJ1IjoibG92YWJsZS1kZW1vIiwiYSI6ImNtNTBxb3g4eTBjdXgya3M4cDR5dGw0eWsifQ.demo_token';
    
    if (!token || token.includes('demo_token')) {
      setNeedsToken(true);
      return;
    }

    if (!mapContainer.current) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: center,
      zoom: zoom,
      pitch: 45,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add fullscreen control
    map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

    // Add 3D terrain
    map.current.on('load', () => {
      map.current?.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
      });
      
      map.current?.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

      // Add sky layer for better 3D effect
      map.current?.addLayer({
        'id': 'sky',
        'type': 'sky',
        'paint': {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 90.0],
          'sky-atmosphere-sun-intensity': 15
        }
      });
    });

    // Add markers for each location
    locations.forEach((location) => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.width = '40px';
      el.style.height = '40px';
      el.style.backgroundImage = 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMTgiIGZpbGw9IiNFRjQ0NDQiIGZpbGwtb3BhY2l0eT0iMC4zIi8+CjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEyIiBmaWxsPSIjRUY0NDQ0Ii8+CjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjYiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=)';
      el.style.backgroundSize = 'cover';
      el.style.cursor = 'pointer';

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<div class="p-2">
          <h3 class="font-semibold text-lg mb-1">${location.name}</h3>
          ${location.description ? `<p class="text-sm text-muted-foreground">${location.description}</p>` : ''}
        </div>`
      );

      new mapboxgl.Marker(el)
        .setLngLat(location.coordinates)
        .setPopup(popup)
        .addTo(map.current!);
    });

    // Fit map to show all locations
    if (locations.length > 1) {
      const bounds = new mapboxgl.LngLatBounds();
      locations.forEach(loc => bounds.extend(loc.coordinates));
      map.current.fitBounds(bounds, { padding: 50 });
    }

    return () => {
      map.current?.remove();
    };
  }, [locations, center, zoom, mapboxToken]);

  const handleTokenSubmit = () => {
    if (mapboxToken) {
      window.location.reload();
    }
  };

  if (needsToken && !mapboxToken) {
    return (
      <div className={`${height} bg-muted rounded-xl flex flex-col items-center justify-center p-8`}>
        <MapPin className="w-16 h-16 text-primary mb-4" />
        <h3 className="text-xl font-semibold mb-2">Mapbox Token Required</h3>
        <p className="text-muted-foreground text-center mb-4 max-w-md">
          To enable interactive maps, please enter your Mapbox public token. 
          Get one free at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>
        </p>
        <div className="flex gap-2 w-full max-w-md">
          <Input 
            placeholder="pk.eyJ1..." 
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="flex-1"
          />
          <button 
            onClick={handleTokenSubmit}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Load Map
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div ref={mapContainer} className={`${height} rounded-xl shadow-lg`} />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/5 rounded-xl" />
    </div>
  );
};
