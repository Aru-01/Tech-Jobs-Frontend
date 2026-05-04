'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '@/lib/api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = async (providedToken = null) => {
    const token = providedToken || (typeof window !== 'undefined' ? localStorage.getItem('access_token') : null);
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const response = await authApi.profile();
      if (response.success && response.data) {
        const u = {
          id: response.data.id,
          name: response.data.full_name,
          full_name: response.data.full_name,
          email: response.data.email,
          role: response.data.role,
          avatar: response.data.full_name?.[0]?.toUpperCase() || 'U',
          profile_image: response.data.profile_image,
          profile_image_url: response.data.profile_image_url,
        };
        setUser(u);
      } else {
        setUser(null);
        localStorage.removeItem('access_token');
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      setUser(null);
      localStorage.removeItem('access_token');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProfile();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authApi.login(credentials);
      const token = response.data?.access || response.data?.access_token;
      if (response.success && token) {
        localStorage.setItem('access_token', token);
        await refreshProfile(token);
        return { success: true };
      }
      return { success: false, message: response.message || 'Login failed' };
    } catch (error) {
      return { success: false, message: 'An unexpected error occurred' };
    }
  };

  const register = async (userData) => {
    try {
      // dj-rest-auth requires password1 and password2
      const payload = {
        ...userData,
        password1: userData.password,
        password2: userData.password,
      };
      const response = await authApi.register(payload);
      const token = response.data?.access || response.data?.access_token;
      if (response.success && token) {
        localStorage.setItem('access_token', token);
        await refreshProfile(token);
        return { success: true };
      }
      return { success: false, message: response.message || 'Registration failed' };
    } catch (error) {
      return { success: false, message: 'An unexpected error occurred' };
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      setUser(null);
      localStorage.removeItem('access_token');
      toast.success('Logged out successfully');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshProfile, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
