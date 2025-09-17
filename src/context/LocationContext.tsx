import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  country: string;
}

interface LocationContextType {
  location: LocationData | null;
  isLoading: boolean;
  error: string | null;
  refreshLocation: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Get user's coordinates
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        });
      });

      const { latitude, longitude } = position.coords;

      // Reverse geocoding using a free API
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      
      if (!response.ok) {
        throw new Error('Failed to get location details');
      }

      const data = await response.json();
      
      setLocation({
        latitude,
        longitude,
        city: data.city || data.locality || 'Unknown City',
        state: data.principalSubdivision || 'Unknown State',
        country: data.countryName || 'Unknown Country'
      });
    } catch (err) {
      console.error('Location error:', err);
      setError(err instanceof Error ? err.message : 'Failed to get location');
      
      // Fallback to default location
      setLocation({
        latitude: 18.5204,
        longitude: 73.8567,
        city: 'Pune',
        state: 'Maharashtra', 
        country: 'India'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refreshLocation = () => {
    getCurrentLocation();
  };

  useEffect(() => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      setLocation({
        latitude: 18.5204,
        longitude: 73.8567,
        city: 'Pune',
        state: 'Maharashtra',
        country: 'India'
      });
      setIsLoading(false);
      return;
    }

    getCurrentLocation();
  }, []);

  return (
    <LocationContext.Provider value={{
      location,
      isLoading,
      error,
      refreshLocation
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};