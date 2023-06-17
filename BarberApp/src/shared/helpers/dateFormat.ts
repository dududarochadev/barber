import moment from 'moment';
import 'moment/locale/pt-br';

export const dateFormat = (date: Date, format = 'L') => {
  moment.locale('pt-br');

  return date ? moment(date).format(format) : '';
};

export const setToDate = (date: string) => {
  return new Date(Number(date.replace('/Date(', '').replace('+0000)/', '')));
};
