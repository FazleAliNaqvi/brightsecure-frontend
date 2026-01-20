import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import { getErrorMessage } from './errors';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle token refresh
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // Only handle on client side
    if (typeof window === 'undefined') {
      return Promise.reject(error);
    }

    // Skip token refresh for auth endpoints (login, register, etc.)
    const isAuthEndpoint = originalRequest?.url?.includes('/auth/login') ||
      originalRequest?.url?.includes('/auth/register') ||
      originalRequest?.url?.includes('/auth/refresh');

    // If 401 and not already retried, try to refresh token (but not for auth endpoints)
    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        const response = await axios.post(`${API_URL}/auth/refresh/`, {
          refresh: refreshToken,
        });

        const { access } = response.data.data;
        localStorage.setItem('access_token', access);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed - clear tokens and redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Show toast for server errors (5xx) and network errors
    // Client errors (4xx) are typically handled by the calling code
    if (typeof window !== 'undefined') {
      const status = error.response?.status;
      if (!status || status >= 500) {
        toast.error(getErrorMessage(error, 'An unexpected error occurred'));
      }
    }

    return Promise.reject(error);
  }
);

// API Response type
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: number;
    message: string;
    details?: Record<string, any>;
  };
  message?: string;
}

// Auth API
export const authApi = {
  register: (data: {
    email: string;
    password: string;
    password_confirm: string;
    first_name: string;
    last_name: string;
    phone?: string;
  }) => api.post<ApiResponse>('/auth/register/', data),

  login: (data: { email: string; password: string }) =>
    api.post<ApiResponse>('/auth/login/', data),

  logout: (refreshToken: string) =>
    api.post<ApiResponse>('/auth/logout/', { refresh: refreshToken }),

  refreshToken: (refreshToken: string) =>
    api.post<ApiResponse>('/auth/refresh/', { refresh: refreshToken }),

  getMe: () => api.get<ApiResponse>('/auth/me/'),

  updateMe: (data: Partial<{
    first_name: string;
    last_name: string;
    phone: string;
    timezone: string;
    notification_preferences: Record<string, any>;
  }>) => api.patch<ApiResponse>('/auth/me/', data),

  changePassword: (data: {
    old_password: string;
    new_password: string;
    new_password_confirm: string;
  }) => api.post<ApiResponse>('/auth/change-password/', data),

  forgotPassword: (email: string) =>
    api.post<ApiResponse>('/auth/forgot-password/', { email }),

  resetPassword: (data: {
    token: string;
    new_password: string;
    new_password_confirm: string;
  }) => api.post<ApiResponse>('/auth/reset-password/', data),

  verifyEmail: (token: string) =>
    api.post<ApiResponse>('/auth/verify-email/', { token }),
};

// Organizations API
export const organizationsApi = {
  list: () => api.get<ApiResponse>('/organizations/'),

  get: (id: string) => api.get<ApiResponse>(`/organizations/${id}/`),

  create: (data: {
    name: string;
    industry_type: string;
    email: string;
    phone: string;
    timezone?: string;
  }) => api.post<ApiResponse>('/organizations/', data),

  update: (id: string, data: Partial<any>) =>
    api.patch<ApiResponse>(`/organizations/${id}/`, data),

  updateVoice: (id: string, data: { voice_id: string; greeting_script?: string }) =>
    api.patch<ApiResponse>(`/organizations/${id}/voice/`, data),

  getMembers: (id: string) =>
    api.get<ApiResponse>(`/organizations/${id}/members/`),

  inviteMember: (id: string, data: { email: string; role: string }) =>
    api.post<ApiResponse>(`/organizations/${id}/invite/`, data),

  updateMember: (orgId: string, memberId: string, data: any) =>
    api.patch<ApiResponse>(`/organizations/${orgId}/members/${memberId}/`, data),

  removeMember: (orgId: string, memberId: string) =>
    api.delete<ApiResponse>(`/organizations/${orgId}/members/${memberId}/remove/`),

  getVoices: () => api.get<ApiResponse>('/organizations/voices/'),
};

// Appointments API
export const appointmentsApi = {
  list: (params?: {
    calendar_id?: string;
    status?: string;
    start_date?: string;
    end_date?: string;
    upcoming?: boolean;
  }) => api.get<ApiResponse>('/appointments/', { params }),

  get: (id: string) => api.get<ApiResponse>(`/appointments/${id}/`),

  create: (data: {
    calendar_id: string;
    title: string;
    start_time: string;
    end_time?: string;
    duration_minutes?: number;
    caller_name: string;
    caller_phone: string;
    caller_email?: string;
    notes?: string;
  }) => api.post<ApiResponse>('/appointments/', data),

  update: (id: string, data: Partial<any>) =>
    api.patch<ApiResponse>(`/appointments/${id}/`, data),

  confirm: (id: string) =>
    api.post<ApiResponse>(`/appointments/${id}/confirm/`),

  cancel: (id: string) =>
    api.post<ApiResponse>(`/appointments/${id}/cancel/`),

  reschedule: (id: string, data: { start_time: string; end_time?: string }) =>
    api.post<ApiResponse>(`/appointments/${id}/reschedule/`, data),

  getAvailability: (params: {
    calendar_id: string;
    date: string;
    duration_minutes?: number;
  }) => api.get<ApiResponse>('/appointments/availability/', { params }),
};

// Calendars API
export const calendarsApi = {
  list: () => api.get<ApiResponse>('/appointments/calendars/'),

  get: (id: string) => api.get<ApiResponse>(`/appointments/calendars/${id}/`),

  create: (data: { organization_id: string; name: string; timezone?: string }) =>
    api.post<ApiResponse>('/appointments/calendars/', data),

  updateWorkingHours: (id: string, working_hours: Record<string, any>) =>
    api.patch<ApiResponse>(`/appointments/calendars/${id}/working-hours/`, { working_hours }),

  getEvents: (id: string, params: { start_date: string; end_date: string }) =>
    api.get<ApiResponse>(`/appointments/calendars/${id}/events/`, { params }),
};

// Calls API
export const callsApi = {
  list: (params?: {
    organization_id?: string;
    status?: string;
    outcome?: string;
    start_date?: string;
    end_date?: string;
  }) => api.get<ApiResponse>('/calls/', { params }),

  get: (id: string) => api.get<ApiResponse>(`/calls/${id}/`),

  getTranscript: (id: string) => api.get<ApiResponse>(`/calls/${id}/transcript/`),

  updateOutcome: (id: string, data: { outcome: string; summary?: string }) =>
    api.patch<ApiResponse>(`/calls/${id}/outcome/`, data),

  addNote: (id: string, content: string) =>
    api.post<ApiResponse>(`/calls/${id}/notes/`, { content }),

  getStats: (params: {
    organization_id: string;
    start_date?: string;
    end_date?: string;
  }) => api.get<ApiResponse>('/calls/stats/', { params }),
};

// Billing API
export const billingApi = {
  getPlans: () => api.get<ApiResponse>('/billing/plans/'),

  getSubscription: (organizationId: string) =>
    api.get<ApiResponse>(`/billing/${organizationId}/subscription/`),

  createSubscription: (organizationId: string, data: { plan_id: string }) =>
    api.post<ApiResponse>(`/billing/${organizationId}/subscription/`, data),

  updateSubscription: (organizationId: string, data: { plan_id?: string; cancel_at_period_end?: boolean }) =>
    api.patch<ApiResponse>(`/billing/${organizationId}/subscription/`, data),

  getPaymentMethods: (organizationId: string) =>
    api.get<ApiResponse>(`/billing/${organizationId}/payment-methods/`),

  addPaymentMethod: (organizationId: string, data: { payment_method_id: string }) =>
    api.post<ApiResponse>(`/billing/${organizationId}/payment-methods/`, data),

  setDefaultPaymentMethod: (organizationId: string, paymentMethodId: string) =>
    api.post<ApiResponse>(`/billing/${organizationId}/payment-methods/default/`, {
      payment_method_id: paymentMethodId,
    }),

  deletePaymentMethod: (organizationId: string, paymentMethodId: string) =>
    api.delete<ApiResponse>(`/billing/${organizationId}/payment-methods/${paymentMethodId}/`),

  getInvoices: (organizationId: string) =>
    api.get<ApiResponse>(`/billing/${organizationId}/invoices/`),

  getUsage: (organizationId: string) =>
    api.get<ApiResponse>(`/billing/${organizationId}/usage/`),
};

// Dashboard API
export const dashboardApi = {
  getOverview: () => api.get<ApiResponse>('/dashboard/overview/'),

  getStats: () => api.get<ApiResponse>('/dashboard/stats/'),

  getActivity: (params?: { limit?: number }) =>
    api.get<ApiResponse>('/dashboard/activity/', { params }),

  getQuickActions: () => api.get<ApiResponse>('/dashboard/quick-actions/'),

  // Legacy endpoints for admin
  getClientMetrics: (params: {
    organization_id: string;
    start_date?: string;
    end_date?: string;
  }) => api.get<ApiResponse>('/dashboard/client/', { params }),

  getAdminMetrics: (params?: { start_date?: string; end_date?: string }) =>
    api.get<ApiResponse>('/dashboard/admin/', { params }),

  getRealtimeActivity: () => api.get<ApiResponse>('/dashboard/admin/activity/'),
};

// Notifications API
export const notificationsApi = {
  list: (params?: { unread_only?: boolean }) =>
    api.get<ApiResponse>('/notifications/', { params }),

  markRead: (notificationIds?: string[]) =>
    api.post<ApiResponse>('/notifications/mark-read/', { notification_ids: notificationIds }),

  getCount: () => api.get<ApiResponse>('/notifications/count/'),

  delete: (id: string) => api.delete<ApiResponse>(`/notifications/${id}/`),
};

// Prompt Variants API (A/B Testing)
export const promptVariantsApi = {
  list: (params?: { organization_id?: string; status?: string }) =>
    api.get<ApiResponse>('/calls/prompt-variants/', { params }),

  get: (id: string) => api.get<ApiResponse>(`/calls/prompt-variants/${id}/`),

  create: (data: {
    organization_id: string;
    name: string;
    description?: string;
    system_prompt: string;
    first_message?: string;
    traffic_percentage?: number;
    is_control?: boolean;
  }) => api.post<ApiResponse>('/calls/prompt-variants/', data),

  update: (id: string, data: Partial<{
    name: string;
    description: string;
    system_prompt: string;
    first_message: string;
    traffic_percentage: number;
    is_control: boolean;
  }>) => api.patch<ApiResponse>(`/calls/prompt-variants/${id}/`, data),

  delete: (id: string) => api.delete<ApiResponse>(`/calls/prompt-variants/${id}/`),

  activate: (id: string, trafficPercentage?: number) =>
    api.post<ApiResponse>(`/calls/prompt-variants/${id}/activate/`, {
      traffic_percentage: trafficPercentage ?? 50,
    }),

  pause: (id: string) =>
    api.post<ApiResponse>(`/calls/prompt-variants/${id}/pause/`),

  promote: (id: string) =>
    api.post<ApiResponse>(`/calls/prompt-variants/${id}/promote/`),

  getAnalytics: (organizationId: string) =>
    api.get<ApiResponse>('/calls/prompt-analytics/', {
      params: { organization_id: organizationId },
    }),
};

export default api;
