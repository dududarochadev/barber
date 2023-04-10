import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { SplashScreen } from './shared/components';
import { AppThemeProvider, MenuProvider } from './shared/contexts';
import { queryClient } from './shared/services/queryClient';
import { useState } from 'react';
import { UserProvider } from './shared/contexts/UserContext';

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserProvider>
          <AppThemeProvider>
            {isLoading ? (
              <SplashScreen setIsLoading={setIsLoading} />
            ) : (
              <MenuProvider>
                <AppRoutes />
              </MenuProvider>
            )}
          </AppThemeProvider>
        </UserProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
