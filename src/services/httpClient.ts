import axios from 'axios';

import { storageKeys } from '@/config/storageKeys';

export const httpClient = axios.create({
  baseURL: 'http://localhost:3001',
});

httpClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(storageKeys.accessToken);
  config.headers.set('Authorization', `Bearer ${accessToken}`);
  return config;
});
