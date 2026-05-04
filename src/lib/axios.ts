import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Send cookies with every request (for JWTCookieAuthentication)
  timeout: 15000,        // 15-second timeout
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor: attach Bearer token if present in localStorage
axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor: normalize all responses to GlobalResponse format
axiosInstance.interceptors.response.use(
  (response) => {
    // The backend CustomJSONRenderer wraps all responses in { success, data, message }
    // If it's already wrapped, return as-is
    if (response.data && typeof response.data.success === 'boolean') {
      return response.data;
    }
    // Fallback: wrap the raw response data
    return { success: true, message: 'Success', data: response.data };
  },
  (error) => {
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      return Promise.resolve({
        success: false,
        message: 'Request timed out. Is the backend server running on port 8000?',
        data: null,
      });
    }

    if (error.response) {
      const { status, data } = error.response;

      // Token expired or invalid – clean up localStorage
      if (status === 401) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token');
        }
      }

      // Normalize error response
      let message = 'An error occurred';
      let errors = {};

      if (data && typeof data === 'object') {
        if (data.success === false && data.message) {
          // Already in our format
          return Promise.resolve(data);
        }
        // Raw DRF/allauth error format
        message = data.detail || data.non_field_errors?.[0] || data.message || 'An error occurred';
        errors = data;
      }

      return Promise.resolve({
        success: false,
        message,
        errors,
        data: null,
      });
    }

    if (error.request) {
      return Promise.resolve({
        success: false,
        message: 'Cannot reach the server. Make sure the backend is running at ' + BASE_URL,
        data: null,
      });
    }

    return Promise.resolve({
      success: false,
      message: error.message || 'An unexpected error occurred.',
      data: null,
    });
  }
);
