'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import api from '@/lib/axios';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('crm_user');
    const token = localStorage.getItem('crm_token') || Cookies.get('crm_token');
    if (storedUser && token) {
      if (!localStorage.getItem('crm_token')) {
        localStorage.setItem('crm_token', token);
      }
      if (!Cookies.get('crm_token')) {
        Cookies.set('crm_token', token, { expires: 7 });
      }
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        // Handle malformed JSON
        localStorage.removeItem('crm_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('crm_token', data.token);
    localStorage.setItem('crm_user', JSON.stringify(data.user));
    Cookies.set('crm_token', data.token, { expires: 7 });
    setUser(data.user);
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('crm_token', data.token);
    localStorage.setItem('crm_user', JSON.stringify(data.user));
    Cookies.set('crm_token', data.token, { expires: 7 });
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('crm_token');
    localStorage.removeItem('crm_user');
    Cookies.remove('crm_token');
    setUser(null);
    window.location.href = '/login';
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
