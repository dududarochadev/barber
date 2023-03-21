import Typography from '@mui/material/Typography';
import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';

export const Dashboard = () => {

  return (
    <LayoutBase
      titulo='Página dedicada ao meu amor'
      barraDeFerramentas={<FerramentasDeDetalhe mostrarBotaoSalvarEFechar />}
    >
      <Typography variant='h5'>A Rafaela é a mulher mais linda do mundo</Typography>
    </LayoutBase>
  );
};