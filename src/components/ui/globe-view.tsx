import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Globe } from 'lucide-react';

interface GlobeLocation {
  name: string;
  coordinates: [number, number];
  color?: string;
}

interface GlobeViewProps {
  locations?: GlobeLocation[];
  height?: string;
}

export const GlobeView = ({ 
  locations = [],
  height = "h-[600px]"
}: GlobeViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [needsToken, setNeedsToken] = useState<boolean>(false);

  useEffect(() => {
    const token = import.meta.env.VITE_MAPBOX_TOKEN || 'pk.eyJ1IjoibG92YWJsZS1kZW1vIiwiYSI6ImNtNTBxb3g4eTBjdXgya3M4cDR5dGw0eWsifQ.demo_token';
    
    if (!token || token.includes('demo_token')) {
      setNeedsToken(true);
      return;
    }

    if (!mapContainer.current) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      projection: 'globe',
      zoom: 1.5,
      center: [77.5, 28.5],
      pitch: 0,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Disable scroll zoom for smoother experience
    map.current.scrollZoom.disable();

    // Add atmosphere and fog effects
    map.current.on('style.load', () => {
      map.current?.setFog({
        color: 'rgb(220, 220, 255)',
        'high-color': 'rgb(36, 92, 223)',
        'horizon-blend': 0.4,
        'space-color': 'rgb(11, 11, 25)',
        'star-intensity': 0.6
      });
    });

    // Add markers for locations
    locations.forEach((location) => {
      const el = document.createElement('div');
      el.className = 'pulse-marker';
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = location.color || '#EF4444';
      el.style.boxShadow = `0 0 20px ${location.color || '#EF4444'}`;
      el.style.animation = 'pulse 2s infinite';

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<div class="p-2">
          <h3 class="font-semibold">${location.name}</h3>
        </div>`
      );

      new mapboxgl.Marker(el)
        .setLngLat(location.coordinates)
        .setPopup(popup)
        .addTo(map.current!);
    });

    // Rotation animation settings
    const secondsPerRevolution = 120;
    const maxSpinZoom = 5;
    const slowSpinZoom = 3;
    let userInteracting = false;
    let spinEnabled = true;

    function spinGlobe() {
      if (!map.current) return;
      
      const zoom = map.current.getZoom();
      if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
        let distancePerSecond = 360 / secondsPerRevolution;
        if (zoom > slowSpinZoom) {
          const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
          distancePerSecond *= zoomDif;
        }
        const center = map.current.getCenter();
        center.lng -= distancePerSecond;
        map.current.easeTo({ center, duration: 1000, easing: (n) => n });
      }
    }

    // Event listeners
    map.current.on('mousedown', () => { userInteracting = true; });
    map.current.on('dragstart', () => { userInteracting = true; });
    map.current.on('mouseup', () => { userInteracting = false; spinGlobe(); });
    map.current.on('touchend', () => { userInteracting = false; spinGlobe(); });
    map.current.on('moveend', () => { spinGlobe(); });

    spinGlobe();

    return () => {
      map.current?.remove();
    };
  }, [locations, mapboxToken]);

  const handleTokenSubmit = () => {
    if (mapboxToken) {
      window.location.reload();
    }
  };

  if (needsToken && !mapboxToken) {
    return (
      <div className={`${height} bg-muted rounded-xl flex flex-col items-center justify-center p-8`}>
        <Globe className="w-16 h-16 text-primary mb-4" />
        <h3 className="text-xl font-semibold mb-2">Enable 3D Globe View</h3>
        <p className="text-muted-foreground text-center mb-4 max-w-md">
          Enter your Mapbox token to explore destinations on an interactive 3D globe.
          Get one free at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>
        </p>
        <div className="flex gap-2 w-full max-w-md">
          <Input 
            placeholder="pk.eyJ1..." 
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
          />
          <button 
            onClick={handleTokenSubmit}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Load Globe
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div ref={mapContainer} className={`${height} rounded-xl shadow-lg`} />
      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs">
        <h3 className="font-semibold mb-2">🌍 Interactive Globe</h3>
        <p className="text-sm text-muted-foreground">
          Click and drag to rotate • Scroll to zoom • Click markers for details
        </p>
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};
