/**
 * Maps Service
 * Handles Google Maps API integration and geocoding
 */

interface Coordinates {
  lat: number;
  lng: number;
}

interface GeocodeResult {
  address: string;
  coordinates: Coordinates;
}

export const mapsService = {
  /**
   * Get coordinates from address
   */
  async geocodeAddress(address: string): Promise<Coordinates | null> {
    try {
      // Check if Google Maps is loaded
      if (typeof window === 'undefined' || !window.google) {
        console.warn('[Maps Service] Google Maps not loaded');
        return null;
      }

      const geocoder = new google.maps.Geocoder();
      
      return new Promise((resolve) => {
        geocoder.geocode({ address }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            const location = results[0].geometry.location;
            resolve({
              lat: location.lat(),
              lng: location.lng(),
            });
          } else {
            console.error('[Maps Service] Geocoding failed:', status);
            resolve(null);
          }
        });
      });
    } catch (error) {
      console.error('[Maps Service] Error geocoding address:', error);
      return null;
    }
  },

  /**
   * Get address from coordinates
   */
  async reverseGeocode(coordinates: Coordinates): Promise<string | null> {
    try {
      // Check if Google Maps is loaded
      if (typeof window === 'undefined' || !window.google) {
        console.warn('[Maps Service] Google Maps not loaded');
        return null;
      }

      const geocoder = new google.maps.Geocoder();
      
      return new Promise((resolve) => {
        geocoder.geocode({ location: coordinates }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            resolve(results[0].formatted_address);
          } else {
            console.error('[Maps Service] Reverse geocoding failed:', status);
            resolve(null);
          }
        });
      });
    } catch (error) {
      console.error('[Maps Service] Error reverse geocoding:', error);
      return null;
    }
  },

  /**
   * Calculate distance between two points (in km)
   */
  calculateDistance(point1: Coordinates, point2: Coordinates): number {
    const R = 6371; // Radius of the Earth in km
    const dLat = this.toRadians(point2.lat - point1.lat);
    const dLng = this.toRadians(point2.lng - point1.lng);
    
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(point1.lat)) *
        Math.cos(this.toRadians(point2.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  },

  /**
   * Convert degrees to radians
   */
  toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  },

  /**
   * Get user's current location
   */
  async getCurrentLocation(): Promise<Coordinates | null> {
    try {
      if (typeof window === 'undefined' || !navigator.geolocation) {
        return null;
      }

      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error('[Maps Service] Error getting location:', error);
            resolve(null);
          }
        );
      });
    } catch (error) {
      console.error('[Maps Service] Error getting current location:', error);
      return null;
    }
  },
};
