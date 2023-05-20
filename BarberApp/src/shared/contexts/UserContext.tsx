import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ICadastroUsuario, ILogin, servicoDeAutenticacao } from '../services/api/auth/servicoDeAutenticacao';

interface IUserContextData {
  idUsuario: number;
  nomeUsuario: string;
  isAuthenticated: boolean;
  login: (usuario: ILogin) => Promise<string | void>;
  cadastro: (usuario: ICadastroUsuario) => Promise<string | void>;
}

const UserContext = createContext({} as IUserContextData);

export const useUserContext = () => {
  return useContext(UserContext);
};

type Props = {
  children?: React.ReactNode,
};

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [idUsuario, setIdUsuario] = useState(0);
  const [nomeUsuario, setNomeUsuario] = useState('');

  const handleLogin = useCallback(async (login: ILogin) => {
    const result = await servicoDeAutenticacao.login(login);

    if (result instanceof Error) {
      return result.message;
    } else {
      const usuario = await servicoDeAutenticacao.obterUsuario();

      setIdUsuario(usuario.id);
      setNomeUsuario(usuario.primeiroNome);
    }
  }, []);

  const handleCadastro = useCallback(async (cadastroUsuario: ICadastroUsuario) => {
    const result = await servicoDeAutenticacao.cadastrar(cadastroUsuario);

    if (result instanceof Error) {
      return result.message;
    } else {
      const usuario = await servicoDeAutenticacao.obterUsuario();

      setIdUsuario(usuario.id);
      setNomeUsuario(usuario.primeiroNome);
    }
  }, []);

  const isAuthenticated = useMemo(() => idUsuario !== 0, [idUsuario]);

  return (
    <UserContext.Provider value={{ idUsuario, nomeUsuario, login: handleLogin, cadastro: handleCadastro, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};
