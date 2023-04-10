import { Api } from '../axios-config';

interface IUsuario {
  id: number;
  nome: string;
  email: string;
  cpf?: string;
  telefone?: number;
  sexo: number;
  imagem: string;
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