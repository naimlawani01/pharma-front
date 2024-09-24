// utils/apiConfig.js

export const getApiBaseUrl = () => {
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:5000/api';  // URL de base pour le développement
    } else {
      return 'https://my-production-api.com/api';  // URL de base pour la production
    }
  };