import  api from '../utils/axiosInstance'
import { AuthorizationError } from '../utils/errors'; // Erreur personnalisée

export const login = async (credentials) => {
    const response = await api.post(`/auth/login`, credentials,{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
    if (role !== "simple_user") {
        throw new AuthorizationError("Accès refusé : l'utilisateur n'a pas la permission.");
    }
    return response.data;
};

export const logout = () => {
    // Logique de déconnexion
};
