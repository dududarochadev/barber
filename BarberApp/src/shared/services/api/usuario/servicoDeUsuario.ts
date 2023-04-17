import { Api } from '../axios-config';

interface IUsuario {
  id: number;
  nomeCompleto: string;
  primeiroNome: string;
  email: string;
  cpf?: string;
  telefone?: string;
  sexo: number;
  foto: string;
}

const obterPorId = async (id: number): Promise<IUsuario> => {
  try {
    const { data } = await Api.get<IUsuario>(
      `/usuario?id=${id}`
    );

    return data;
  } catch (error) {
    throw new Error((error as { message: string }).message || 'Erro ao obter estabelecimentos.');
  }
};

export const servicoDeUsuario = {
  obterPorId
};