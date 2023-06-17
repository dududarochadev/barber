import { Api } from './axios-config';
import { IAgendamento } from './servicoDeAgendamento';

export interface IUsuario {
  id: number;
  nome: string;
  primeiroNome: string;
  email: string;
  cpf?: string;
  telefone?: string;
  sexo: number;
  foto: string;
  agendamentos: IAgendamento[];
}

const obterPorEmail = async (email: string): Promise<IUsuario> => {
  try {
    const { data } = await Api.get<IUsuario>(
      `/usuario?email=${email}`
    );

    return data;
  } catch (error) {
    throw new Error((error as { message: string }).message || 'Erro ao obter usuário.');
  }
};

const obterPorId = async (id: number): Promise<IUsuario> => {
  try {
    const { data } = await Api.get<IUsuario>(
      `/usuario?id=${id}`
    );

    return data;
  } catch (error) {
    throw new Error((error as { message: string }).message || 'Erro ao obter usuário.');
  }
};

export const servicoDeAutenticacao = {
  obterPorEmail,
  obterPorId
};