import { Api } from '../axios-config';

const obterEstabelecimentos = async (): Promise<string[]> => {
  try {
    const { data } = await Api.get<string[]>(
      '/estabelecimento'
    );

    return data;
  } catch (error) {
    throw new Error((error as { message: string }).message || 'Erro ao obter estabelecimentos.');
  }
};

export const servicoDeEstabelecimento = {
  obterEstabelecimentos
};