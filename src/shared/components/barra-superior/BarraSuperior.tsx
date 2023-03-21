import { AppBar, Autocomplete, Box, TextField, useTheme } from '@mui/material';
import { Logo } from '../../assets';
import { Environment } from '../../environment';
import { MenuUsuario } from './components/menuUsuario/MenuUsuario';

export const BarraSuperior: React.FC = () => {
  const theme = useTheme();

  const options = [
    { id: 1, descricao: 'La Mafia' },
    { id: 2, descricao: 'Beto Hair' },
    { id: 3, descricao: 'Barbearia do seu Zé' },
    { id: 4, descricao: 'Menezes Club' },
  ];

  return (
    <AppBar
      position='relative'
    >
      <Box display='flex' padding={theme.spacing(1)} gap={2} alignItems='center'>
        <img src={Logo} alt='logo' height={theme.spacing(5)} />

        <Box width={250}>
          <Autocomplete
            size='small'
            fullWidth
            noOptionsText="Nenhum resultado encontrado"
            options={options.map(opt => opt.descricao)}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                variant='outlined'
                placeholder={Environment.inputDeBusca}
              />
            )}
          />
        </Box>

        <Box display='flex' flex={1} justifyContent='end'>
          <MenuUsuario />
        </Box>
      </Box>
    </AppBar >
  );
};