import { Api } from './axios-config';
import { ICalendario } from './servicoDeCalendario';

export interface IProfissional {
  id: number;
  nome: string;
  foto: string;
}

const incluir = async (body: IProfissional): Promise<IProfissional> => {
  try {
    const { data } = await Api.post<IProfissional>(
      '/profissional/incluir',
      body
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

const editar = async (body: IProfissional): Promise<IProfissional> => {
  try {
    const { data } = await Api.put<IProfissional>(
      '/profissional/editar',
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
      `/profissional/excluir?id=${id}`
    );

  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

const obterPorId = async (id: number): Promise<IProfissional> => {
  try {
    const { data } = await Api.get<IProfissional>(
      `/profissional?id=${id}`
    );

    return data;
  } catch (error) {
    throw new Error((error as { message: string }).message || 'Erro ao obter profissional.');
  }
};

const listarHorariosDisponiveis = async (id: number, dia: ICalendario): Promise<string[]> => {
  try {
    const { data } = await Api.get<string[]>(
      `/profissional?id=${id}`, {
        params: {
          dia: dia
        }
      }
    );

    return data;
  } catch (error) {
    throw new Error((error as { message: string }).message || 'Erro ao obter profissional.');
  }
};

export const servicoDeProfissional = {
  incluir,
  editar,
  excluir,
  obterPorId,
  listarHorariosDisponiveis
};