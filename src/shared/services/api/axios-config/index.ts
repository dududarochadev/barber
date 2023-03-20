import axios from 'axios';
import { Environment } from '../../../environment';
import { errorInterceptor, responseInterceptor } from './interceptors';

const Api = axios.create({
  baseURL: Environment.baseUrl
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error),
);

export { Api };