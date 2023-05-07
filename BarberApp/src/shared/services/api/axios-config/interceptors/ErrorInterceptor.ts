import { AxiosError } from 'axios';

export const errorInterceptor = (error: AxiosError) => {

  if (error.message === 'Network Error') {
    return Promise.reject(new Error('Erro de conexão.'));
  }

  if (error.response?.status === 401) {
    window.location.href = 'http://localhost:3000/login';
  }

  if (error.response?.status === 403) {
    window.location.href = 'http://localhost:3000/sem-permissao';
  }

  return Promise.reject(error);
};