import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate = false }: AuthGuardProps) {
  const { signedIn } = useAuth();

  if (signedIn && !isPrivate) {
    return <Navigate to="/" />;
  }

  if (!signedIn && isPrivate) {
    return <Navigate to="/sign-in" />;
  }

  return <Outlet />;
}
