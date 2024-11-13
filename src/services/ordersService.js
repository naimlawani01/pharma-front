import api from '../utils/axiosInstance';

// Récupérer toutes les commandes de l'utilisateur
export const fetchUserOrders = async () => {
  try {
    const response = await api.get('/orders');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des commandes');
  }
};

// Créer une nouvelle commande
export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erreur lors de la création de la commande');
  }
};

// Récupérer une commande par son ID
export const fetchOrderById = async (orderId) => {
  try {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erreur lors de la récupération de la commande');
  }
};
