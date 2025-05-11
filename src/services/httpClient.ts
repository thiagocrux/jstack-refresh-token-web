import axios, { AxiosError } from 'axios';

import { storageKeys } from '@/config/storageKeys';
import { AuthService } from './AuthService';

export const httpClient = axios.create({
  baseURL: 'http://localhost:3001',
});

httpClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(storageKeys.accessToken);
  config.headers.set('Authorization', `Bearer ${accessToken}`);
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const refreshToken = localStorage.getItem(storageKeys.refreshToken);

    if ((error.response && error.response.status !== 401) || !refreshToken) {
      return Promise.reject(error);
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await AuthService.refreshToken(refreshToken);

    localStorage.setItem(storageKeys.accessToken, newAccessToken);
    localStorage.setItem(storageKeys.refreshToken, newRefreshToken);

    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    return httpClient(originalRequest);
  }
);
