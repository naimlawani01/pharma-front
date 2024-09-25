import React, { createContext, useState } from 'react';
import { login as loginService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (credentials) => {
        try {
            const userData = await loginService(credentials);
            setUser(userData);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
