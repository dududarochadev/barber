import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export const errorInterceptor = (error: AxiosError) => {
  const navigate = useNavigate();

  if (error.message === 'Network Error') {
    return Promise.reject(new Error('Erro de conexão.'));
  }

  if (error.response?.status === 401) {
    navigate('/pagina-inicial');
  }

  if (error.response?.status === 403) {
    navigate('/sem-permissao');
  }

  return Promise.reject(error);
};