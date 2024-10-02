import { useState, useEffect } from 'react';

export const useUserPosition = () => {
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserPosition([latitude, longitude]);
      },
      (error) => {
        console.error('Erreur lors de la récupération de la position:', error);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  return { userPosition };
};
