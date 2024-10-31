import  api from '../utils/axiosInstance'
import { AuthorizationError } from '../utils/errors'; // Erreur personnalisée

export const login = async (credentials) => {
    try {
        const response = await api.post(`/auth/login`, credentials,{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        console.log(response.data);
        if (response.data.role !== "customer") {
          throw new AuthorizationError("Accès refusé : l'utilisateur n'a pas la permission.");
        }
    
        return response.data;  // On retourne les données de l'utilisateur
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Mot de passe ou informations incorrectes
          throw new Error('Username ou mot de passe incorrect. Veuillez vérifier vos informations.');
        } else if (error instanceof AuthorizationError) {
          // Erreur d'autorisation
          throw error;
        } else {
          // Autres erreurs (serveur, réseau, etc.)
          throw new Error('Erreur lors de la connexion. Veuillez vérifier vos informations.');
        }
      }
};

export const logout = () => {
    // Logique de déconnexion
};
