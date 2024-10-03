
import api from '../utils/axiosInstance';


// Fonction pour récupérer les produits d'une pharmacie 
export const fetchProductsInPharmacy = async (pharmacyId) => {
  try {
    const response = await api.get(`/pharmacies/${pharmacyId}/products`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors du chargement des produits de la pharmacie:', error);
    throw error;
  }
};

// Fonction pour récupérer tous les produits de toutes les pharmacies
export const fetchAllProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Erreur lors du chargement de tous les produits:', error);
    throw error;
  }
};


// Fonction pour récupérer un produit
export const fetchProductById = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors du chargement de tous les produits:', error);
    throw error;
  }
};
// Fonction pour rechercher un produit 
export const searchProducts = async (query) => {
  try {
    const response = await api.get(`/products?search=${query}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la recherche de produits:', error);
    throw error;
  }
};
