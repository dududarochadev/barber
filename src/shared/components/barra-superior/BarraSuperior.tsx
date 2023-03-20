import { AppBar, Avatar, Box, Button, Divider, Icon, Menu, MenuItem, Typography, useTheme } from '@mui/material';
import { useCallback, useState } from 'react';

export const BarraSuperior: React.FC = () => {
  // const { toggleDrawerOpen } = useDrawerContext();
  const [anchorElProfile, setAnchorElProfile] = useState<null | HTMLElement>(
    null,
  );
  const menuAberto = Boolean(anchorElProfile);

  const theme = useTheme();

  const aoClicarBotaoMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElProfile(event.currentTarget);
    },
    [],
  );

  const aoFecharMenu = useCallback(() => {
    setAnchorElProfile(null);
  }, []);

  return (
    <AppBar
      position='relative'
    >
      <Box display='flex' padding={theme.spacing(1)} alignItems='center'>
        {/* <Box>
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        </Box> */}

        <Box display='flex' flex={1} justifyContent='end'>
          <Button
            variant='text'
            sx={{ padding: 0 }}
            onClick={aoClicarBotaoMenu}
            aria-controls={menuAberto ? 'profile-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={menuAberto ? 'true' : undefined}
          >
            <Box gap={1} display='flex' alignItems='center' padding={1}>
              <Avatar
                sx={{ height: theme.spacing(4), width: theme.spacing(4) }}
              >US</Avatar>
              <Typography variant='button'>Olá, <strong>usuário</strong>.</Typography>
              <Icon>expand_more</Icon>
            </Box>
          </Button>

          <Menu
            sx={{ mt: 2, left: 0, width: 260 }}
            anchorEl={anchorElProfile}
            open={menuAberto}
            onClose={aoFecharMenu}
          >
            <MenuItem disabled>
              <Box width={260}>
                <Typography variant="body1">Teste</Typography>
              </Box>
            </MenuItem>

            <Divider />

            <MenuItem disableRipple>
              Página inicial
            </MenuItem>

            <Box px={2} mb={1} mt={4}>
              <Button
                variant="outlined"
                startIcon={<Icon>logout_rounded</Icon>}
              >
                Encerrar sessão
              </Button>
            </Box>
          </Menu>
        </Box>
      </Box>
    </AppBar >
  );
};