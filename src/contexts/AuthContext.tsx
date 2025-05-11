import { createContext, ReactNode, useCallback, useState } from 'react';

import { AuthService } from '@/services/AuthService';

interface AuthProviderProps {
  children: ReactNode;
}

interface IAuthContextValue {
  signedIn: boolean;
  signIn: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: AuthProviderProps) {
  const [signedIn, setSignedIn] = useState(() => {
    return !!localStorage.getItem('live019:accessToken');
  });

  const signIn = useCallback(async (email: string, password: string) => {
    const { accessToken, refreshToken } = await AuthService.signIn({
      email,
      password,
    });

    localStorage.setItem('live019:accessToken', accessToken);
    localStorage.setItem('live019:refreshToken', refreshToken);
    setSignedIn(true);
  }, []);

  const value: IAuthContextValue = {
    signedIn,
    signIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
