import Typography from '@mui/material/Typography';
import { LayoutBase } from '../../shared/layouts';
import { Avatar, Box, Grid, Icon, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Paper, useMediaQuery, useTheme } from '@mui/material';
import { useUserContext } from '../../shared/contexts/UserContext';
import { useQuery } from '@tanstack/react-query';
import { servicoDeAutenticacao } from '../../shared/services/api/auth/servicoDeAutenticacao';
import { Button } from '../../shared/components/MUI/button/Button';
import { useNavigate } from 'react-router-dom';

export const PaginaInicial = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const colorDisabled = theme.palette.text.disabled;

  const { data: usuario } = useQuery(
    ['usuario'],
    () => servicoDeAutenticacao.obterUsuario()
  );

  return (
    <LayoutBase>
      <Grid container spacing={3}>
        <Grid item lg={4} xs={12}>
          <Box display='flex' flexDirection='column' gap={3}>
            <Paper variant='outlined' sx={{ borderRadius: 2, padding: 2 }}>
              <Box display='flex' justifyContent='end' flex={1} marginRight={1}>
                <IconButton onClick={() => navigate('/perfil')}>
                  <Icon>edit</Icon>
                </IconButton>

                {lgDown && <IconButton>
                  <Icon>expand_more</Icon>
                </IconButton>}
              </Box>


              <Box display='flex' justifyContent='center' marginBottom={2}>
                <Avatar src={'/assets/images/fotos-de-perfil/Floripa.jpg'} sx={{ height: 150, width: 150 }} />
              </Box>

              <Box display='flex' flexDirection='column' gap={1}>
                <Typography align='center' variant='h6'>{usuario?.nomeCompleto}</Typography>
                <Typography align='center'>{usuario?.email}</Typography>
                <Typography align='center'>{usuario?.telefone}</Typography>
              </Box>
            </Paper>

            <Box component={Paper} variant='outlined' height={lgDown ? undefined : 500}>
              <Box paddingTop={3} paddingLeft={3}>
                <Typography variant='h4'>Meu estabelecimento</Typography>
              </Box>
              <List>
                <ListItemButton onClick={() => navigate('/estabelecimentos')}>
                  <ListItemIcon>
                    <Icon>apartment</Icon>
                  </ListItemIcon>
                  <ListItemText>
                    Informações
                  </ListItemText>
                </ListItemButton>

                <ListItemButton onClick={() => navigate('/estabelecimentos')}>
                  <ListItemIcon>
                    <Icon>person</Icon>
                  </ListItemIcon>
                  <ListItemText>
                    Profissionais
                  </ListItemText>
                </ListItemButton>

                <ListItemButton onClick={() => navigate('/estabelecimentos')}>
                  <ListItemIcon>
                    <Icon>building</Icon>
                  </ListItemIcon>
                  <ListItemText>
                    Servicos
                  </ListItemText>
                </ListItemButton>
              </List>
            </Box>
          </Box>
        </Grid>

        <Grid item lg={8} xs={12}>
          <Box display='flex' flexDirection='column' gap={3}>
            <Paper variant='outlined' sx={{ borderRadius: 2, padding: 2 }}>
              <Box display='flex' flexDirection='column' gap={3}>
                <Typography variant='h4'>Seus agendamentos</Typography>

                <Box display='flex' flexDirection='column' gap={2}>
                  <Paper variant='outlined' sx={{ padding: 1, lightingColor: 'secondary' }}>
                    <Box display='flex' justifyContent='space-between' alignItems='center' paddingRight={3}>
                      <Box>
                        <Typography variant='h6'>Beto Hair</Typography>
                        <Typography>Dia 25 de novembro de 2023 às 18:00</Typography>
                        <Typography>Rua Brasil, 267 - São Leopoldo</Typography>
                      </Box>

                      <Box>
                        <IconButton
                          onClick={() => navigate('/agendamento')}
                        >
                          <Icon>edit</Icon>
                        </IconButton>
                      </Box>
                    </Box>
                  </Paper>
                </Box>

                {/* <Box display='flex' justifyContent='end'>
                <Button
                  label='Agendar'
                  variant='contained'
                />
              </Box> */}
              </Box>
            </Paper>

            <Paper variant='outlined' sx={{ borderRadius: 2, padding: 2 }}>
              <Box display='flex' flexDirection='column' gap={3}>
                <Typography variant='h4'>Agendamentos passados</Typography>

                <Box display='flex' flexDirection='column' gap={2}>
                  <Paper variant='outlined' sx={{ padding: 1, lightingColor: 'secondary' }}>
                    <Box display='flex' justifyContent='space-between' alignItems='center' paddingRight={3}>
                      <Box>
                        <Typography color={colorDisabled} variant='h6'>La Máfia Barbearia</Typography>
                        <Typography color={colorDisabled}>Dia 18 de novembro de 2023 às 18:00</Typography>
                        <Typography color={colorDisabled}>Rua Brasil, 267 - São Leopoldo</Typography>
                      </Box>

                      <Box>
                        <Button
                          variant='contained'
                          label='Reagendar'
                          onClick={() => navigate('/agendamento')}
                        />
                      </Box>
                    </Box>
                  </Paper>

                  <Paper variant='outlined' sx={{ padding: 1, lightingColor: 'secondary' }}>
                    <Box display='flex' justifyContent='space-between' alignItems='center' paddingRight={3}>
                      <Box>
                        <Typography color={colorDisabled} variant='h6'>La Máfia Barbearia</Typography>
                        <Typography color={colorDisabled}>Dia 18 de novembro de 2023 às 18:00</Typography>
                        <Typography color={colorDisabled}>Rua Brasil, 267 - São Leopoldo</Typography>
                      </Box>

                      <Box>
                        <Button
                          variant='contained'
                          label='Reagendar'
                          onClick={() => navigate('/agendamento')}
                        />
                      </Box>
                    </Box>
                  </Paper>

                  <Paper variant='outlined' sx={{ padding: 1, lightingColor: 'secondary' }}>
                    <Box display='flex' justifyContent='space-between' alignItems='center' paddingRight={3}>
                      <Box>
                        <Typography color={colorDisabled} variant='h6'>La Máfia Barbearia</Typography>
                        <Typography color={colorDisabled}>Dia 18 de novembro de 2023 às 18:00</Typography>
                        <Typography color={colorDisabled}>Rua Brasil, 267 - São Leopoldo</Typography>
                      </Box>

                      <Box>
                        <Button
                          variant='contained'
                          label='Reagendar'
                          onClick={() => navigate('/agendamento')}
                        />
                      </Box>
                    </Box>
                  </Paper>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </LayoutBase >
  );
};