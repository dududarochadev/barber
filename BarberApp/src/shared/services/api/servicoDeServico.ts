import { Api } from './axios-config';

export interface IServico {
  id: number;
  descricao: string;
  valor: number;
}

const incluir = async (body: IServico): Promise<IServico> => {
  try {
    const { data } = await Api.post<IServico>(
      '/servico/incluir',
      body
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

const editar = async (body: IServico): Promise<IServico> => {
  try {
    const { data } = await Api.put<IServico>(
      '/servico/editar',
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
      `/servico/excluir?id=${id}`
    );

  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

const obterPorId = async (id: number): Promise<IServico> => {
  try {
    const { data } = await Api.get<IServico>(
      `/servico?id=${id}`
    );

    return data;
  } catch (error) {
    throw new Error((error as { message: string }).message || 'Erro ao obter servico.');
  }
};

export const servicoDeServico = {
  incluir,
  editar,
  excluir,
  obterPorId
};