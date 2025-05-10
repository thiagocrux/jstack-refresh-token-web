import { createContext, ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

interface IAuthContextValue {
  signedIn: boolean;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: AuthProviderProps) {
  const value: IAuthContextValue = {
    signedIn: false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
