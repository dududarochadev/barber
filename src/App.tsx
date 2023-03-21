import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { AppThemeProvider, MenuProvider } from './shared/contexts';

export const App = () => {
  return (
    <AppThemeProvider>
      <MenuProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </MenuProvider>
    </AppThemeProvider>
  );
};
