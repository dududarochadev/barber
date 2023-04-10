import { Brightness4, Brightness7 } from '@mui/icons-material';
import { AppBar, Autocomplete, Box, IconButton, TextField, Tooltip, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../assets';
import { Environment } from '../../environment';
import { MenuUsuario } from '../menu-usuario/MenuUsuario';
import { useQuery } from '@tanstack/react-query';
import { useAppThemeContext } from '../../contexts';
import { servicoDeEstabelecimento } from '../../services/api/estabelecimento/servicoDeEstabelecimento';

export const BarraSuperior: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { toggleTheme } = useAppThemeContext();

  const { data: estabelecimentos } = useQuery(
    ['estabelecimentos'],
    servicoDeEstabelecimento.obterEstabelecimentos
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

          <Box display='flex' flexGrow={2} justifyContent='center' alignItems='center' gap={2}>
            <Autocomplete
              sx={{ maxWidth: 500 }}
              size='small'
              fullWidth
              freeSolo
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
            <Tooltip
              title={
                theme.palette.mode === 'dark'
                  ? 'Mudar para tema Light'
                  : 'Mudar para tema Dark'
              }>
              <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness4 /> : <Brightness7 />}
              </IconButton>
            </Tooltip>

            <MenuUsuario />
          </Box>
        </Box>
      </Box>
    </AppBar>
  );
};