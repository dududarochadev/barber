import { Api } from './axios-config';
import { IUsuario } from './servicoDeUsuario';

export interface ILogin {
  email: string,
  senha: string,
}

const login = async (body: ILogin): Promise<number | Error> => {
  try {
    const { data } = await Api.post<number | Error>(
      '/auth/login',
      body
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

const logout = async () => {
  try {
    await Api.post('/auth/logout');

  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export interface ICadastroUsuario {
  nome: string,
  email: string,
  cpf?: string,
  telefone?: number,
  senha: string,
  confirmacaoDeSenha: string,
}

const cadastrar = async (body: ICadastroUsuario): Promise<number | Error> => {
  try {
    const { data } = await Api.post<number | Error>(
      '/auth/cadastrar',
      body
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

const obterUsuarioDoCookie = async (): Promise<IUsuario> => {
  try {
    const { data } = await Api.get<IUsuario>(
      '/auth'
    );

    return data;
  } catch (error) {
    throw new Error((error as { message: string }).message || 'Erro ao obter usuário.');
  }
};

export const servicoDeAutenticacao = {
  login,
  logout,
  cadastrar,
  obterUsuarioDoCookie
};