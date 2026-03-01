import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { useAuthStore } from '../store/authStore';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Важно для отправки cookies
});

// Интерцептор для добавления токена доступа
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Интерцептор для обработки ошибок и обновления токена
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as (AxiosRequestConfig & { _retry?: boolean }) | undefined;

    // Если ошибка 401 и это не повторный запрос
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Пытаемся обновить токен
        const response = await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const { access_token } = response.data;
        useAuthStore.getState().setAccessToken(access_token);

        // Повторяем оригинальный запрос с новым токеном
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${access_token}`,
        };
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Если не удалось обновить токен - разлогиниваем
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Публичный axios instance (без интерцепторов)
export const publicAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
