import { axiosInstance } from './axios';

// --- TYPES ---
export interface GlobalResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export interface User {
  id: number;
  email: string;
  full_name: string;
  role: 'job_seeker' | 'recruiter' | 'admin';
  profile_image?: string;
}

export interface Job {
  id: number;
  title: string;
  short_description: string;
  full_description: string;
  salary: number;
  location: string;
  job_type: string;
  experience_level: string;
  deadline: string;
  tech_stack: string[];
  banner_image_url?: string;
  company: number;
  author: number;
}

export interface Company {
  id: number;
  company_name: string;
  logo_url?: string;
  website?: string;
  location: string;
  industry: string;
  short_description: string;
  full_description: string;
}

// --- AUTH API ---
export const authApi = {
  login: (data: any) => axiosInstance.post<any, GlobalResponse<any>>('/api/auth/login/', data),
  register: (data: any) => axiosInstance.post<any, GlobalResponse<any>>('/api/auth/register/', data),
  logout: () => axiosInstance.post<any, GlobalResponse<any>>('/api/auth/logout/'),
  profile: () => axiosInstance.get<any, GlobalResponse<User>>('/api/auth/profile/'),
  updateProfile: (data: any) => {
    const isFormData = data instanceof FormData;
    const headers: any = {};
    if (!isFormData) headers['Content-Type'] = 'application/json';
    return axiosInstance.patch<any, GlobalResponse<User>>('/api/auth/profile/', data, { headers });
  },
  googleAuth: (data: any) => axiosInstance.post<any, GlobalResponse<any>>('/api/auth/google/', data),
};

// --- JOBS API ---
export const jobsApi = {
  list: (params?: any) => axiosInstance.get<any, GlobalResponse<any>>('/api/jobs/', { params }),
  get: (id: number) => axiosInstance.get<any, GlobalResponse<Job>>(`/api/jobs/${id}/`),
  create: (data: any) => {
    const isFormData = data instanceof FormData;
    const headers: any = {};
    if (!isFormData) headers['Content-Type'] = 'application/json';
    return axiosInstance.post<any, GlobalResponse<Job>>('/api/jobs/', data, { headers });
  },
  update: (id: number, data: any) => {
    const isFormData = data instanceof FormData;
    const headers: any = {};
    if (!isFormData) headers['Content-Type'] = 'application/json';
    return axiosInstance.patch<any, GlobalResponse<Job>>(`/api/jobs/${id}/`, data, { headers });
  },
  delete: (id: number) => axiosInstance.delete(`/api/jobs/${id}/`),
};

// --- COMPANIES API ---
export const companiesApi = {
  list: (params?: any) => axiosInstance.get<any, GlobalResponse<any>>('/api/companies/', { params }),
  get: (id: number) => axiosInstance.get<any, GlobalResponse<Company>>(`/api/companies/${id}/`),
  create: (data: any) => {
    const isFormData = data instanceof FormData;
    const headers: any = {};
    if (!isFormData) headers['Content-Type'] = 'application/json';
    return axiosInstance.post<any, GlobalResponse<Company>>('/api/companies/', data, { headers });
  },
  update: (id: number, data: any) => {
    const isFormData = data instanceof FormData;
    const headers: any = {};
    if (!isFormData) headers['Content-Type'] = 'application/json';
    return axiosInstance.patch<any, GlobalResponse<Company>>(`/api/companies/${id}/`, data, { headers });
  },
  delete: (id: number) => axiosInstance.delete(`/api/companies/${id}/`),
};

// --- DASHBOARD API ---
export const dashboardApi = {
  getStats: () => axiosInstance.get('/api/dashboard/stats/'),
  myJobs: () => axiosInstance.get<any, GlobalResponse<any>>('/api/dashboard/my-jobs/'),
  myCompanies: () => axiosInstance.get<any, GlobalResponse<any>>('/api/dashboard/my-companies/'),
};
