import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { SplashScreen } from './shared/components';
import { AppThemeProvider, MenuProvider } from './shared/contexts';
import { queryClient } from './shared/services/queryClient';
import { useState } from 'react';

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppThemeProvider>
          {isLoading ? (
            <SplashScreen setIsLoading={setIsLoading} />
          ) : (
            <MenuProvider>
              <AppRoutes />
            </MenuProvider>
          )}
        </AppThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
