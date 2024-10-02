import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/axiosInstance';

const useProductsService = () => {
  const { id } = useParams(); 
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  // Fonction pour récupérer les produits d'une pharmacie spécifique
  useEffect(() => {
    const fetchProductsInPharmacy = async () => {
      if (!id) return;  // Vérifie si l'ID est présent avant de faire l'appel
      try {
        const response = await api.get(`/pharmacies/${id}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des produits de la pharmacie:', error);
      }
    };

    fetchProductsInPharmacy();  
  }, [id]);  

  // Fonction pour récupérer tous les produits dans toutes les pharmacies
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await api.get('/products');
        setAllProducts(response.data);  
      } catch (error) {
        console.error('Erreur lors du chargement de tous les produits:', error);
      }
    };

    fetchAllProducts();  
  }, []);  

  return { products, allProducts };
};

export default useProductsService;
