import { Api } from '../axios-config';

export interface IUsuario {
  username: string,
  password: string,
  email?: string,
  telefone?: number,
  role?: number,
}

const signIn = async (body: IUsuario): Promise<{ usuario: IUsuario, accessToken: string } | Error> => {
  try {
    const { data } = await Api.post<{ usuario: IUsuario, accessToken: string } | Error>(
      '/usuario/signin',
      body
    );

    if (data) {
      return data;
    }

    return new Error('Erro no login.');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro no login.');
  }
};

const create = async (body: IUsuario): Promise<boolean | Error> => {
  try {
    const { data } = await Api.post<boolean | Error>(
      '/usuario/incluir',
      body
    );

    if (data) {
      return data;
    }

    return new Error('Erro no login.');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro no login.');
  }
};

export const AuthService = {
  signIn,
  create
};