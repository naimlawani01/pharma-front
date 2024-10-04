import { useState, useEffect } from 'react';
import {fetchAllProducts}  from '../services/productsService';
import {fetchProductById} from '../services/productsService'

export const useFetchAllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllProducts()
      .then((data) => {
        setAllProducts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  return { allProducts, isLoading, error };
};

// Hook pour récupérer un produit spécifique par son ID
export const useFetchProductById = (productId) => {
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const getProductById = async () => {
        if (!productId) return;
        try {
          const productData = await fetchProductById(productId);
          setProduct(productData);
          setIsLoading(false);
        } catch (err) {
          setError(err.message);
          setIsLoading(false);
        }
      };
  
      getProductById();
    }, [productId, product]);
  
    return { product, error, isLoading };
  };