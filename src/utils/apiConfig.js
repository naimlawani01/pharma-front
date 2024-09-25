// utils/apiConfig.js

export const getApiBaseUrl = () => {
    if (process.env.NODE_ENV === 'development') {
      return 'https://back-pharmacie.onrender.com';  // URL de base pour le développement
    } else {
      return 'https://back-pharmacie.onrender.com';  // URL de base pour la production
    }
  };