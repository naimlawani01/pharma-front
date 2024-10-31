import { useState, useEffect } from 'react';

export const useUserPosition = () => {
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error getting user location:', error);
        setUserPosition(null); // Handle error and set to null
      }
    );
  }, []);

  return { userPosition };
};
