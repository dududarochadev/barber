import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { Login } from './shared/components';
import { AppThemeProvider, AuthProvider, MenuProvider } from './shared/contexts';

export const App = () => {
  return (
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
  );
};
