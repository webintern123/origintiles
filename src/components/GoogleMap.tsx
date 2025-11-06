import { useEffect, useRef, useState } from 'react';
import { Dealer } from '../types';
import { MapPin, AlertCircle, Navigation, Phone, Star, Mail, Clock, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
  // Fix TypeScript for Vite env variables
declare global {
  interface ImportMetaEnv {
    readonly VITE_GOOGLE_MAPS_API_KEY: string;
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}


interface GoogleMapProps {
  dealers: Dealer[];
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: string;
}

export function GoogleMap({ 
  dealers, 
  center = { lat: 20.5937, lng: 78.9629 }, // Center of India
  zoom = 5,
  height = '700px'
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const markersRef = useRef<google.maps.Marker[]>([]);

  // Check API key before attempting to load
  const apiKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GOOGLE_MAPS_API_KEY) || '';
  const hasApiKey = apiKey && apiKey.length > 10 && !apiKey.includes('your_');

  // Load Google Maps script only if we have a valid API key
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // No API key - use fallback immediately
    if (!hasApiKey) {
      setShowFallback(true);
      return;
    }

    // Check if already loaded
    if ((window as any).google?.maps) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      setIsLoaded(true);
    };
    
    script.onerror = () => {
      console.warn('Failed to load Google Maps - using fallback view');
      setShowFallback(true);
    };
    
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [hasApiKey, apiKey]);

  // Listen for billing errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      const errorMessage = event.message?.toLowerCase() || event.error?.toString().toLowerCase() || '';
      if (errorMessage.includes('billing') || errorMessage.includes('referernotallowedmaperror')) {
        console.warn('Google Maps billing/auth error - using fallback view');
        setShowFallback(true);
        event.preventDefault();
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || map || showFallback || !hasApiKey) return;

    try {
      const newMap = new google.maps.Map(mapRef.current, {
        center,
        zoom,
        styles: [
          {
            featureType: 'all',
            elementType: 'geometry',
            stylers: [{ color: '#f5f3f0' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#c9e6f0' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#ffffff' }]
          }
        ],
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
      });

      setMap(newMap);
    } catch (error: any) {
      console.warn('Map initialization error - using fallback view:', error.message);
      setShowFallback(true);
    }
  }, [isLoaded, center, zoom, map, showFallback, hasApiKey]);

  // Add markers
  useEffect(() => {
    if (!map || !dealers.length || !isLoaded || showFallback) return;

    try {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      const bounds = new google.maps.LatLngBounds();

      dealers.forEach((dealer) => {
        const position = { 
          lat: dealer.coordinates.lat, 
          lng: dealer.coordinates.lng 
        };

        const svgMarker = {
          path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
          fillColor: '#223B57',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
          scale: 1.5,
          anchor: new google.maps.Point(12, 24),
        };

        const marker = new google.maps.Marker({
          position,
          map,
          title: dealer.name,
          icon: svgMarker,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 12px; max-width: 300px; font-family: Inter, sans-serif;">
              <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #223B57;">
                ${dealer.name}
              </h3>
              <div style="display: flex; gap: 6px; margin-bottom: 8px; flex-wrap: wrap;">
                ${dealer.featured ? `<span style="background: #fbbf24; color: #223B57; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600;">⭐ FEATURED</span>` : ''}
                <span style="background: rgba(34, 59, 87, 0.1); color: #223B57; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 500;">${dealer.type}</span>
                <span style="background: rgba(16, 185, 129, 0.1); color: #059669; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 500;">${dealer.category}</span>
              </div>
              <div style="font-size: 13px; color: #666; margin-bottom: 6px;"><strong>⭐ ${dealer.rating}</strong> (${dealer.reviews} reviews)</div>
              <div style="font-size: 13px; color: #666; margin-bottom: 4px;">📍 ${dealer.address}, ${dealer.city}</div>
              <div style="font-size: 13px; color: #666; margin-bottom: 4px;">🗺️ ${dealer.district}, ${dealer.state}</div>
              <div style="font-size: 13px; color: #666; margin-bottom: 4px;">📞 ${dealer.phone}</div>
              <div style="font-size: 13px; color: #666; margin-bottom: 12px;">✉️ ${dealer.email}</div>
              <div style="display: flex; gap: 8px; margin-top: 12px;">
                <a href="https://www.google.com/maps/search/?api=1&query=${dealer.coordinates.lat},${dealer.coordinates.lng}" target="_blank" rel="noopener noreferrer" style="flex: 1; background: #223B57; color: white; padding: 8px 12px; text-align: center; text-decoration: none; border-radius: 6px; font-size: 12px; font-weight: 500;">Get Directions</a>
                <a href="tel:${dealer.phone}" style="flex: 1; background: white; color: #223B57; border: 1px solid #223B57; padding: 8px 12px; text-align: center; text-decoration: none; border-radius: 6px; font-size: 12px; font-weight: 500;">Call Now</a>
              </div>
            </div>
          `,
        });

        marker.addListener('click', () => {
          markersRef.current.forEach(m => {
            const existingInfoWindow = (m as any).infoWindow;
            if (existingInfoWindow) existingInfoWindow.close();
          });
          infoWindow.open(map, marker);
        });

        (marker as any).infoWindow = infoWindow;
        markersRef.current.push(marker);
        bounds.extend(position);
      });

      if (dealers.length > 0) {
        map.fitBounds(bounds);
        google.maps.event.addListenerOnce(map, 'idle', () => {
          const currentZoom = map.getZoom();
          if (dealers.length === 1) {
            map.setZoom(13);
          } else if (currentZoom && currentZoom > 16) {
            map.setZoom(16);
          }
        });
      }
    } catch (error: any) {
      console.warn('Marker creation error - using fallback view:', error.message);
      setShowFallback(true);
    }
  }, [map, dealers, isLoaded, showFallback]);

  // Fallback UI when API key is missing or billing not enabled
  if (showFallback || !hasApiKey) {
    return (
      <div 
        className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-3xl p-8 overflow-y-auto"
        style={{ height }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Info Banner */}
          <Alert className="bg-blue-50 border-blue-200 mb-6">
            <MapPin className="h-5 w-5 text-blue-600" />
            <AlertDescription>
              <p className="text-sm text-neutral-700 mb-2">
                <strong>Dealer Locations</strong>
              </p>
              <p className="text-xs text-neutral-600">
                {!hasApiKey 
                  ? "Showing dealers in list format. Configure Google Maps API key for interactive map view."
                  : "Showing dealers in list format. Interactive map view requires billing to be enabled."}
              </p>
            </AlertDescription>
          </Alert>

          {/* Dealers Grid */}
          <div className="grid gap-4">
            {dealers.map((dealer) => (
              <Card key={dealer.id} className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Dealer Image */}
                    <div className="md:w-48 flex-shrink-0">
                      <div className="relative h-40 md:h-full rounded-2xl overflow-hidden">
                        <img 
                          src={dealer.image} 
                          alt={dealer.name}
                          className="w-full h-full object-cover"
                        />
                        {dealer.featured && (
                          <Badge className="absolute top-3 right-3 bg-amber-400 text-[#223B57] border-0 shadow-lg">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            Featured
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Dealer Info */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                        <div className="flex-1">
                          <h3 className="text-[#223B57] mb-2">{dealer.name}</h3>
                          <div className="flex flex-wrap gap-2">
                            <Badge className="bg-[#223B57]/10 text-[#223B57] border-0 text-xs">
                              {dealer.type}
                            </Badge>
                            <Badge className="bg-emerald-500/10 text-emerald-700 border-0 text-xs">
                              {dealer.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="font-bold text-[#223B57]">{dealer.rating}</span>
                          <span className="text-sm text-neutral-600">({dealer.reviews})</span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-3 text-sm text-neutral-600 mb-4">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#223B57]" />
                          <span>{dealer.address}, {dealer.city}, {dealer.district}, {dealer.state} - {dealer.pincode}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 flex-shrink-0 text-[#223B57]" />
                          <span>{dealer.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 flex-shrink-0 text-[#223B57]" />
                          <span>{dealer.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 flex-shrink-0 text-[#223B57]" />
                          <span>{dealer.timings}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${dealer.coordinates.lat},${dealer.coordinates.lng}`, '_blank')}
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          Get Directions
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.location.href = `tel:${dealer.phone}`}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call Now
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.location.href = `mailto:${dealer.email}`}
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Email
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Setup Instructions (only show if no API key) */}
          {!hasApiKey && (
            <Alert className="bg-amber-50 border-amber-200 mt-6">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              <AlertDescription>
                <p className="text-sm text-neutral-700 mb-2">
                  <strong>Enable Interactive Map (Optional)</strong>
                </p>
                <p className="text-xs text-neutral-600 mb-3">
                  To show dealers on an interactive Google Map:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-xs text-neutral-600 mb-3 ml-2">
                  <li>Get API key from <a href="https://console.cloud.google.com/google/maps-apis" target="_blank" rel="noopener noreferrer" className="text-[#223B57] underline">Google Cloud Console</a></li>
                  <li>Enable billing (free tier: 28,000 map loads/month)</li>
                  <li>Add to <code className="bg-neutral-200 px-1 rounded">.env.local</code> as <code className="bg-neutral-200 px-1 rounded">VITE_GOOGLE_MAPS_API_KEY</code></li>
                </ol>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('https://console.cloud.google.com/google/maps-apis', '_blank')}
                >
                  <ExternalLink className="w-3 h-3 mr-2" />
                  Get API Key
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    );
  }

  // Loading state
  if (!isLoaded) {
    return (
      <div 
        className="flex items-center justify-center bg-neutral-200 rounded-3xl"
        style={{ height }}
      >
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-[#223B57] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading Google Maps...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mapRef} 
      className="w-full rounded-3xl overflow-hidden"
      style={{ height }}
    />
  );
}
