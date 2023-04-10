import { Api } from '../axios-config';
import { IEnumerador } from '../interfaces';

interface IUsuario {
  id: number;
  nome: string;
  email: string;
  cpf?: string;
  telefone?: number;
  sexo: IEnumerador;
}

const obterPorId = async (id: number): Promise<IUsuario> => {
  try {
    const { data } = await Api.get<IUsuario>(
      `/usuario/${id}`
    );

    return data;
  } catch (error) {
    throw new Error((error as { message: string }).message || 'Erro ao obter estabelecimentos.');
  }
};

export const servicoDeUsuario = {
  obterPorId
};