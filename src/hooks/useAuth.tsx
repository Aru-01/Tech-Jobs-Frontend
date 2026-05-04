'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, authApi } from '../lib/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: any) => Promise<any>;
  register: (data: any) => Promise<any>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = async () => {
    try {
      const response = await authApi.profile();
      if (response.success && response.data) {
        const userData = response.data;
        // Map backend fields to frontend UI expectations
        const mappedUser = {
          ...userData,
          name: userData.full_name,
          avatar: userData.profile_image || userData.full_name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
        };
        setUser(mappedUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProfile();
  }, []);

  const login = async (data: any) => {
    const response = await authApi.login(data);
    if (response.success && response.data?.access) {
      localStorage.setItem('access_token', response.data.access);
      await refreshProfile();
    }
    return response;
  };

  const register = async (data: any) => {
    try {
      // Map password to password1/password2 for dj-rest-auth
      const registerData = {
        ...data,
        password1: data.password,
        password2: data.password,
      };
      const response = await authApi.register(registerData);
      if (response.success) {
        if (response.data?.access) {
          localStorage.setItem('access_token', response.data.access);
        }
        await refreshProfile();
      }
      return response;
    } catch (error) {
      return { success: false, message: 'Registration failed' };
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (e) {}
    localStorage.removeItem('access_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
