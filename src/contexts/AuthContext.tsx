import { createContext, ReactNode, useCallback, useState } from 'react';

import { storageKeys } from '@/config/storageKeys';
import { AuthService } from '@/services/AuthService';

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
