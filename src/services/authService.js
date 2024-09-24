import  api from '../utils/axiosInstance'

export const login = async (credentials) => {
    const response = await api.post(`/auth/login`, credentials,{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
    return response.data;
};

export const logout = () => {
    // Logique de déconnexion
};
