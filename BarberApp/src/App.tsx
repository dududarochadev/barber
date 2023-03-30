import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { Login } from './shared/components';
import { AppThemeProvider, AuthProvider, MenuProvider } from './shared/contexts';
import { queryClient } from './shared/services/queryClient';

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppThemeProvider>
          <Login>
            <MenuProvider>
              <BrowserRouter>
                <AppRoutes />
              </BrowserRouter>
            </MenuProvider>
          </Login>
        </AppThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
