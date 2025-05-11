import axios, { AxiosError } from 'axios';

import { storageKeys } from '@/config/storageKeys';
import { AuthService } from './AuthService';

export const httpClient = axios.create({
  baseURL: 'http://localhost:3001',
});

// Injects access token on request headers.
httpClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(storageKeys.accessToken);
  config.headers.set('Authorization', `Bearer ${accessToken}`);
  return config;
});

// Handle 401 errors: if refresh token is valid, get new access token, save payload, and retry request.
httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config!;
    const refreshToken = localStorage.getItem(storageKeys.refreshToken);

    // Avoids expired refresh tokens with status 401 to get caught in the conditional below triggering an infinite loop.
    if (originalRequest?.url === '/refresh-token') {
      window.location.href = '/sign-in';
      localStorage.clear();
      return Promise.reject(error);
    }

    if (error.response?.status !== 401 || !refreshToken) {
      return Promise.reject(error);
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await AuthService.refreshToken(refreshToken);

    localStorage.setItem(storageKeys.accessToken, newAccessToken);
    localStorage.setItem(storageKeys.refreshToken, newRefreshToken);

    // Retry the original request with a valid access token.
    return httpClient(originalRequest);
  }
);
