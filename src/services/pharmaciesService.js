import api from '../utils/axiosInstance';

export const getPharmacies = async() => {

  const response = await api.get('/pharmacies');
  console.log('jk')
  return response.data
};



// Fonction pour récupérer les produits d'une pharmacie 
export const fetchProductsInPharmacy = async (pharmacyId) => {
  try {
    const response = await api.get(`/pharmacies/${pharmacyId}/products`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Erreur lors du chargement des produits de la pharmacie:', error);
    throw error;
  }
};

export const getPharmacyDetails = async (pharmacyId)=> {
  try{
    const response = await api.get(`/pharmacies/${pharmacyId}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error ('Erreur lors du chargement des détails de la pharmacies')
  }
}

