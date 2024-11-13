import { useState, useEffect } from 'react';
import { fetchProductsInPharmacy } from '../services/pharmaciesService';

export const useFetchProductsInPharmacy = (pharmacyId) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProductsInPharmacy = async () => {
      if (!pharmacyId) return;
      try {
        const productsData = await fetchProductsInPharmacy(pharmacyId);
        setProducts(productsData);  // Met à jour l'état des produits de la pharmacie
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    getProductsInPharmacy();
  }, [pharmacyId]);

  return { products, error, isLoading };
};
