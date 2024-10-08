import api from '../utils/axiosInstance';

const getPharmacies = async() => {

  const response = await api.get('/pharmacies');
  return response.data
};

export default getPharmacies;


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

export const getPharmacyDetails = async (pharmacyId)=> {
  try{ 
    const response = await api.get(`/pharmacies/${pharmacyId}`);
    return response.data;
  } catch (error) {
    console.error ('Erreur lors du chargement des détails de la pharmacies')
  }
}

