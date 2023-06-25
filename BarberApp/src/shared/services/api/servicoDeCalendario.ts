import { Api } from './axios-config';

export interface ICalendario {
  id: number;
  mes: string;
  diaDoMes: string;
  diaDaSemana: string;
}

const obterDias = async (): Promise<ICalendario[]> => {
  try {
    const { data } = await Api.get<ICalendario[]>(
      '/calendario'
    );

    return data;
  } catch (error) {
    throw new Error((error as { message: string }).message || 'Erro ao obter calendario.');
  }
};

export const servicoDeCalendario = {
  obterDias
};