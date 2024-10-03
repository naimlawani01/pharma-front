// utils/axiosInstance.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://back-pharmacie.onrender.com',   // URL de base définie dans apiConfig.js
  
});

// Middleware pour ajouter un token à chaque requête si l'utilisateur est authentifié
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Récupération du token du localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  // Ajout du token au header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;