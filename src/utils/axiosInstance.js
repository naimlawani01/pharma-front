// utils/axiosInstance.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://back-pharmacie.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fonction utilitaire pour récupérer le token depuis le localStorage
const getToken = () => {
  const storedData = localStorage.getItem('user');
  return storedData ? JSON.parse(storedData).access_token : null;
};

// Interceptor pour ajouter le token à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor pour gérer les réponses d'erreur
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Optionnel : gestion du rafraîchissement du token
      // const originalRequest = error.config;
      // Tenter un rafraîchissement du token si nécessaire
      // Exemple : await refreshToken();

      // Si le token a expiré, rediriger l'utilisateur vers la page de connexion
      localStorage.removeItem('user'); // Nettoyer le localStorage
      window.location.href = '/login'; // Redirection vers la page de connexion
    }
    return Promise.reject(error);
  }
);

export default api;
