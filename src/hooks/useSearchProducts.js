import { useState, useEffect } from 'react';
import { searchProducts } from '../services/productsService';

export const useSearchProducts = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim() !== '') {
        setIsLoading(true);
        try {
          const results = await searchProducts(query);
          setSuggestions(results);
        } catch (error) {
          console.error('Erreur lors de la récupération des suggestions:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    };

    const debounceFetch = setTimeout(fetchSuggestions, 300); // Ajout d'un délai pour limiter les appels API
    return () => clearTimeout(debounceFetch); // Nettoyage du timeout pour éviter des appels répétés
  }, [query]);

  return {
    query,
    setQuery,
    suggestions,
    isLoading,
  };
};
