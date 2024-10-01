import { useState, useEffect } from 'react';
import api from '../utils/axiosInstance';

const GetPharmacies = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await api.get('/pharmacies');
        setPharmacies(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des pharmacies:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchPharmacies();
  }, []);

  return { pharmacies, loading, error };
};

export default GetPharmacies;
