import { Api } from './axios-config';
import { IEstabelecimento } from './servicoDeEstabelecimento';

export interface IProprietario {
  id: number;
  nome: string;
  foto: string;
  estabelecimentoId: number;
}

const incluir = async (body: IProprietario): Promise<IProprietario> => {
  try {
    const { data } = await Api.post<IProprietario>(
      '/proprietario/incluir',
      body
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

const editar = async (body: IProprietario): Promise<IProprietario> => {
  try {
    const { data } = await Api.put<IProprietario>(
      '/proprietario/editar',
      body
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

const excluir = async (id: number) => {
  try {
    await Api.delete(
      `/proprietario/excluir?id=${id}`
    );

  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

const obterPorId = async (id: number): Promise<IProprietario> => {
  try {
    const { data } = await Api.get<IProprietario>(
      `/proprietario?id=${id}`
    );

    return data;
  } catch (error) {
    throw new Error((error as { message: string }).message || 'Erro ao obter proprietario.');
  }
};

export const servicoDeProprietario = {
  incluir,
  editar,
  excluir,
  obterPorId
};