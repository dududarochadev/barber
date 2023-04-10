import { createContext, useContext } from 'react';

interface IUserContextData {
  idUsuario: number;
  nomeUsuario: string;
}

const UserContext = createContext({} as IUserContextData);

export const useUserContext = () => {
  return useContext(UserContext);
};

type Props = {
  children?: React.ReactNode,
};

export const UserProvider: React.FC<Props> = ({ children }) => {

  const idUsuario = 1;
  const nomeUsuario = 'Dudu';

  return (
    <UserContext.Provider value={{ idUsuario, nomeUsuario }}>
      {children}
    </UserContext.Provider>
  );
};
