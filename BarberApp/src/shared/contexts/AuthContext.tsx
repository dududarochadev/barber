import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService, IUsuario } from '../services/api/auth/AuthService';

interface IAuthContextData {
  isAuthenticated: boolean;
  create: (usuario: IUsuario) => Promise<boolean | void>
  login: (usuario: IUsuario) => Promise<string | void>
  logout: () => void;
}

const AuthContext = createContext({} as IAuthContextData);

const LOCAL_STORAGE_KEY_ACCESS_TOKEN = 'APP_ACCESS_TOKEN';

interface IProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<IProps> = ({ children }) => {
  const [accessToken, setAccesToken] = useState<string>();

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);

    if (accessToken) {
      setAccesToken(accessToken);
    } else {
      setAccesToken(undefined);
    }
  }, []);

  const handleLogin = useCallback(async (usuario: IUsuario) => {
    const result = await AuthService.signIn(usuario);

    if (result instanceof Error) {
      return result.message;
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN, JSON.stringify(result.accessToken));
      setAccesToken(result.accessToken);
    }
  }, []);

  const handleCreate = useCallback(async (usuario: IUsuario) => {
    const result = await AuthService.create(usuario);

    if (result instanceof Error) {
      return !!result.message;
    } else {
      console.log('criado');
      return result;
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
    setAccesToken(undefined);
  }, []);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, create: handleCreate, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider >
  );
};

export const useAuthContext = () => useContext(AuthContext);