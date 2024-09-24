// utils/axiosInstance.js
import axios from 'axios';
import { getApiBaseUrl } from './apiConfig';

const api = axios.create({
  baseURL: getApiBaseUrl(),   // URL de base définie dans apiConfig.js
  timeout: 10000,             // Temps d'attente maximal pour une requête
  
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