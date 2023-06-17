import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ICadastroUsuario, ILogin, servicoDeAutenticacao } from '../services/api/servicoDeAutenticacao';

interface IUserContextData {
  isAuthenticated: boolean;
  login: (usuario: ILogin) => Promise<string | void>;
  cadastro: (usuario: ICadastroUsuario) => Promise<string | void>;
  logout: () => void;
}

const UserContext = createContext({} as IUserContextData);

export const useUserContext = () => {
  return useContext(UserContext);
};

export const LOCAL_STORAGE_KEY_USUARIO_ID = 'ID';

type Props = {
  children?: React.ReactNode,
};

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [idUsuario, setIdUsuario] = useState(0);

  useEffect(() => {
    const idUsuarioStorage = localStorage.getItem(LOCAL_STORAGE_KEY_USUARIO_ID);

    if (idUsuarioStorage) {
      setIdUsuario(JSON.parse(idUsuarioStorage));
    } else {
      setIdUsuario(0);
    }
  }, []);

  const handleLogin = useCallback(async (login: ILogin) => {
    const result = await servicoDeAutenticacao.login(login);

    if (result instanceof Error) {
      return result.message;
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY_USUARIO_ID, JSON.stringify(result));
      setIdUsuario(result);
    }
  }, []);

  const handleCadastro = useCallback(async (cadastroUsuario: ICadastroUsuario) => {
    const result = await servicoDeAutenticacao.cadastrar(cadastroUsuario);

    if (result instanceof Error) {
      return result.message;
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY_USUARIO_ID, JSON.stringify(result));
      setIdUsuario(result);
    }
  }, []);

  const handleLogout = useCallback(async () => {
    await servicoDeAutenticacao.logout();

    localStorage.setItem(LOCAL_STORAGE_KEY_USUARIO_ID, JSON.stringify(0));
    setIdUsuario(0);
  }, []);

  const isAuthenticated = useMemo(() => idUsuario !== 0, [idUsuario]);

  return (
    <UserContext.Provider value={{ login: handleLogin, cadastro: handleCadastro, logout: handleLogout, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};
