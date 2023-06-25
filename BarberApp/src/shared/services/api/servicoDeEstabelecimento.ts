import { Api } from './axios-config';
import { IAgendamento } from './servicoDeAgendamento';
import { IProfissional } from './servicoDeProfissional';
import { IServico } from './servicoDeServico';

export interface IEstabelecimento {
  id: number;
  nome: string;
  cnpj?: string;
  endereco: number;
  agendamentos: IAgendamento[];
  profissionais: IProfissional[];
  servicos: IServico[];
}

const incluir = async (body: IEstabelecimento): Promise<IEstabelecimento> => {
  try {
    const { data } = await Api.post<IEstabelecimento>(
      '/estabelecimento/incluir',
      body
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

const editar = async (body: IEstabelecimento): Promise<IEstabelecimento> => {
  try {
    const { data } = await Api.put<IEstabelecimento>(
      '/estabelecimento/editar',
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
      `/estabelecimento/excluir?id=${id}`
    );

  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

const obterPorId = async (id: number): Promise<IEstabelecimento> => {
  try {
    const { data } = await Api.get<IEstabelecimento>(
      `/estabelecimento?id=${id}`
    );

    return data;
  } catch (error) {
    throw new Error((error as { message: string }).message || 'Erro ao obter estabelecimento.');
  }
};

export const servicoDeEstabelecimento = {
  incluir,
  editar,
  excluir,
  obterPorId
};