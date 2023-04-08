import axios from 'axios';
import { Environment } from '../../../environment';
import { errorInterceptor, responseInterceptor } from './interceptors';

const token = localStorage.getItem('access_token');

const Api = axios.create({
  baseURL: Environment.baseUrl,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`
  }
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error),
);

export { Api };