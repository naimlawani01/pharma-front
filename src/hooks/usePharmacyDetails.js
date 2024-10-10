// hooks/usePharmacyDetails.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {getPharmacyDetails} from '../services/pharmaciesService';

const usePharmacyDetails = () => {
  const { pharmacyId } = useParams();  // Récupère l'ID de la pharmacie depuis l'URL
  const [pharmacy, setPharmacy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await getPharmacyDetails(pharmacyId);
        setPharmacy(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [pharmacyId]);

  return { pharmacy, loading, error };
};

export default usePharmacyDetails;
