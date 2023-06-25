import { Brightness4, Brightness7 } from '@mui/icons-material';
import { AppBar, Autocomplete, Box, IconButton, TextField, Tooltip, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../../assets';
import { Environment } from '../../../environment';
import { useQuery } from '@tanstack/react-query';
import { useAppThemeContext } from '../../../contexts';
import { servicoDeEstabelecimento } from '../../../services/api/servicoDeEstabelecimento';
import { MenuUsuario } from '../menu-usuario/MenuUsuario';

export const BarraSuperior: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { toggleTheme } = useAppThemeContext();

  const { data: estabelecimentos } = useQuery(
    ['estabelecimentos'],
    () => servicoDeEstabelecimento.obterPorId(1)
    //TROCAR O 1
  );

  const handleClickImage = () => {
    navigate('/pagina-inicial');
  };

  return (
    <AppBar color='inherit' position='relative'>
      <Box display='flex' flex={1} alignContent='center' justifyContent='center'>
        <Box
          display='flex'
          flex={1}
          justifyContent='space-between'
          alignItems='center'
          paddingX={theme.spacing(4)}
          paddingY={theme.spacing(2)}
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
              options={[]}//AJUSTAR PARA BUSCAR ESTABELECIMENTO
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