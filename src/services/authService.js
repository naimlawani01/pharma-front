import  {api} from '../utils/axiosInstance'

export const login = async (credentials) => {
    const response = await api.post(`/login`, credentials);
    return response.data;
};

export const logout = () => {
    // Logique de déconnexion
};
