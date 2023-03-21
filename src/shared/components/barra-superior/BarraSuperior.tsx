import { AppBar, Autocomplete, Box, TextField, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../assets';
import { Environment } from '../../environment';
import { MenuUsuario } from './components/menuUsuario/MenuUsuario';

export const BarraSuperior: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const options = [
    { id: 1, descricao: 'La Mafia' },
    { id: 2, descricao: 'Beto Hair' },
    { id: 3, descricao: 'Barbearia do seu Zé' },
    { id: 4, descricao: 'Menezes Club' },
  ];

  const handleClickImagem = () => {
    navigate('/pagina-inicial');
  };

  return (
    <AppBar position='relative'>
      <Box display='flex' flex={1} alignContent='center' justifyContent='center'>
        <Box
          display='flex'
          flex={1}
          justifyContent='center'
          alignItems='center'
          maxWidth='lg'
          padding={theme.spacing(1)}
          gap={2}
        >
          <Box marginRight='15%'>
            <img
              src={Logo}
              alt='logo'
              height={theme.spacing(5)}
              onClick={handleClickImagem}
              style={{ cursor: 'pointer' }}
            />
          </Box>

          <Box display='flex' flexGrow={2}>
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

          <Box marginLeft={1} display='flex' flex={1} justifyContent='end'>
            <MenuUsuario />
          </Box>
        </Box>
      </Box>
    </AppBar>
  );
};