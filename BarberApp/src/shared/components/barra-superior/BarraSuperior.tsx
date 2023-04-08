import { Search } from '@mui/icons-material';
import { AppBar, Autocomplete, Box, TextField, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../assets';
import { Environment } from '../../environment';
import { MenuUsuario } from '../menu-usuario/MenuUsuario';
import { servicoDeEstabelecimento } from '../../services/api/estabelecimento/servicoDeEstabelecimento';
import { useQuery } from '@tanstack/react-query';

export const BarraSuperior: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const options = [
    { id: 1, descricao: 'La Mafia' },
    { id: 2, descricao: 'Beto Hair' },
    { id: 3, descricao: 'Barbearia do seu Zé' },
    { id: 4, descricao: 'Menezes Club' },
  ];

  const { data: estabelecimentos } = useQuery(
    ['estabelecimentos'],
    () => servicoDeEstabelecimento.obterEstabelecimentos()
  );

  const handleClickImage = () => {
    navigate('/pagina-inicial');
  };

  return (
    <AppBar position='relative'>
      <Box display='flex' flex={1} alignContent='center' justifyContent='center'>
        <Box
          display='flex'
          flex={1}
          justifyContent='space-between'
          alignItems='center'
          maxWidth='lg'
          padding={theme.spacing(1)}
          gap={2}
        >
          <Box display='flex' flex={1}>
            <img
              src={Logo}
              alt='logo'
              height={theme.spacing(5)}
              onClick={handleClickImage}
              style={{ cursor: 'pointer' }}
            />
          </Box>

          <Box display='flex' flexGrow={2} justifyContent='center'>
            <Autocomplete
              sx={{ maxWidth: 500 }}
              size='small'
              fullWidth
              popupIcon={<Search />}
              noOptionsText="Nenhum resultado encontrado"
              options={estabelecimentos || []}
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
      </Box>
    </AppBar>
  );
};