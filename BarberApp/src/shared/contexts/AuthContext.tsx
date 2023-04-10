import { createContext, useContext } from 'react';

interface IAuthContextData {
  idUsuario: number;
  nomeUsuario: string;
}

const AuthContext = createContext({} as IAuthContextData);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

type Props = {
  children?: React.ReactNode,
};

export const AuthProvider: React.FC<Props> = ({ children }) => {

  const idUsuario = 1;
  const nomeUsuario = 'Dudu';

  return (
    <AuthContext.Provider value={{ idUsuario, nomeUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};
