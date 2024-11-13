import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as loginService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Charger l'utilisateur depuis le localStorage au chargement de l'application
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            const userData = await loginService(credentials);
            setUser(userData);
            // Stocker l'utilisateur dans le localStorage
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        // Supprimer l'utilisateur du localStorage
        localStorage.removeItem('user');
    };

    useEffect(() => {
        // Optionnel : vous pouvez ajouter une logique pour valider l'utilisateur ici
        // Exemple : vérifier si le token est encore valide
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, error, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
    return useContext(AuthContext);
};
