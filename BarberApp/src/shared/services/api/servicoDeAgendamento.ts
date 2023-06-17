import { Api } from './axios-config';

export interface IAgendamento {
  id: number;
  dataAgendamento: Date;
  passado: boolean;
  usuarioId: number;
  servicoId: number;
  descricaoServico: string;
  profissionalId: number;
  nomeProfissional: string;
  estabelecimentoId: number;
  nomeEstabelecimento: string;
  enderecoEstabelecimento: string;
}

const incluir = async (body: IAgendamento): Promise<IAgendamento> => {
  try {
    const { data } = await Api.post<IAgendamento>(
      '/agendamento/incluir',
      body
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

const editar = async (body: IAgendamento): Promise<IAgendamento> => {
  try {
    const { data } = await Api.put<IAgendamento>(
      '/agendamento/editar',
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
      `/agendamento/excluir?id=${id}`
    );

  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

const obterPorId = async (id: number): Promise<IAgendamento> => {
  try {
    const { data } = await Api.get<IAgendamento>(
      `/agendamento?id=${id}`
    );

    return data;
  } catch (error) {
    throw new Error((error as { message: string }).message || 'Erro ao obter agendamento.');
  }
};

export const servicoDeAgendamento = {
  incluir,
  editar,
  excluir,
  obterPorId
};