import React, { createContext, useState, useContext } from 'react';
import { authAPI } from './api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const register = async (userData) => {
        try {
            const res = await authAPI.register(userData);
            const { token, user } = res.data.data;
            localStorage.setItem('token', token);
            setUser(user);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Registration failed' };
        }
    };

    const login = async (credentials) => {
        try {
            const res = await authAPI.login(credentials);
            const { token, user } = res.data.data;
            localStorage.setItem('token', token);
            setUser(user);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Login failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
