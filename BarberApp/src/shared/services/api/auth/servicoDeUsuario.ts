import { Api } from '../axios-config';

export interface ILogin {
  email: string,
  senha: string,
}

interface IRetornoLogin {
  nomeCompleto: string,
  token: string
}

const login = async (body: ILogin): Promise<IRetornoLogin> => {
  try {
    const { data } = await Api.post<IRetornoLogin>(
      '/account/login',
      body
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

const logout = async () => {
  try {
    await Api.post('/account/logout');

  } catch (error) {
    throw new Error((error as { message: string }).message || 'Erro no logout.');
  }
};

export interface ICadastroUsuario {
  nomeCompleto: string,
  email: string,
  cpf?: string,
  telefone?: number,
  senha: string,
  confirmacaoDeSenha: string,
}

const cadastrar = async (body: ICadastroUsuario): Promise<boolean> => {
  try {
    const { data } = await Api.post<boolean>(
      '/account/cadastrar',
      body
    );

    return data;
  } catch (error: any) {
    throw new Error(error.mensagens);
  }
};

export const servicoDeUsuario = {
  login,
  logout,
  cadastrar
};