import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';

import { Appbar } from './components/Appbar';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Router } from './Router';

export function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Appbar />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  );
}
