import { AxiosError } from 'axios';

import {
  createContext,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';

import { storageKeys } from '@/config/storageKeys';
import { AuthService } from '@/services/AuthService';
import { httpClient } from '@/services/httpClient';

interface AuthProviderProps {
  children: ReactNode;
}

interface IAuthContextValue {
  signedIn: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: AuthProviderProps) {
  const [signedIn, setSignedIn] = useState(() => {
    return !!localStorage.getItem(storageKeys.accessToken);
  });

  useLayoutEffect(() => {
    // Injects access token on request headers.
    const interceptorId = httpClient.interceptors.request.use((config) => {
      const accessToken = localStorage.getItem(storageKeys.accessToken);
      config.headers.set('Authorization', `Bearer ${accessToken}`);
      return config;
    });

    return () => {
      httpClient.interceptors.request.eject(interceptorId);
    };
  }, []);

  useLayoutEffect(() => {
    // Handle 401 errors: if refresh token is valid, get new access token, save payload, and retry request.
    const interceptorId = httpClient.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config!;
        const refreshToken = localStorage.getItem(storageKeys.refreshToken);

        // Avoids expired refresh tokens with status 401 to get caught in the conditional below triggering an infinite loop.
        if (originalRequest?.url === '/refresh-token') {
          setSignedIn(false);
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

    return () => {
      httpClient.interceptors.response.eject(interceptorId);
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { accessToken, refreshToken } = await AuthService.signIn({
      email,
      password,
    });

    localStorage.setItem(storageKeys.accessToken, accessToken);
    localStorage.setItem(storageKeys.refreshToken, refreshToken);
    setSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.clear();
    setSignedIn(false);
  }, []);

  const value: IAuthContextValue = {
    signedIn,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
