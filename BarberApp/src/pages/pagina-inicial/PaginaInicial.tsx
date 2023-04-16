import Typography from '@mui/material/Typography';
import { LayoutBase } from '../../shared/layouts';
import { Avatar, Box, Grid, Icon, IconButton, Paper, useMediaQuery, useTheme } from '@mui/material';

export const PaginaInicial = () => {
  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <LayoutBase>
      <Grid container spacing={3}>
        <Grid item lg={4} xs={12}>
          <Paper variant='outlined' sx={{ height: 500, borderRadius: 2, padding: 2, backgroundColor: '#f0dff2' }}>
            <Box display='flex' justifyContent='end' flex={1} marginRight={1}>
              <Box>
                <IconButton>
                  <Icon>edit</Icon>
                </IconButton>

                {lgDown && <IconButton>
                  <Icon>expand_more</Icon>
                </IconButton>}
              </Box>
            </Box>

            <Box display='flex' justifyContent='center' marginBottom={2}>
              <Avatar sx={{ height: 150, width: 150 }} />
            </Box>

            <Box display='flex' flexDirection='column' gap={1}>
              <Typography align='center' variant='h6'>Dudu da Rocha</Typography>
              <Typography align='center'>eduardoldarocha@gmail.com</Typography>
              <Typography align='center'>(51) 99384-8249</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item lg={8} xs={12}>
          <Paper variant='outlined' sx={{ borderRadius: 2, padding: 2 }}>
            <Box display='flex' flexDirection='column' gap={2}>
              <Typography variant='h4'>Seus agendamentos</Typography>

              <Paper variant='outlined' sx={{ padding: 1, lightingColor: 'secondary' }}>
                <Typography variant='h6'>La Máfia Barbearia</Typography>
                <Typography>Dia 18 de novembro de 2023 às 18:00</Typography>
                <Typography>Rua Brasil, 267 - São Leopoldo</Typography>
              </Paper>

              <Paper variant='outlined' sx={{ padding: 1 }}>
                <Typography variant='h6'>La Máfia Barbearia</Typography>
                <Typography>Dia 18 de novembro de 2023 às 18:00</Typography>
                <Typography>Rua Brasil, 267 - São Leopoldo</Typography>
              </Paper>

              <Paper variant='outlined' sx={{ padding: 1 }}>
                <Typography variant='h6'>La Máfia Barbearia</Typography>
                <Typography>Dia 18 de novembro de 2023 às 18:00</Typography>
                <Typography>Rua Brasil, 267 - São Leopoldo</Typography>
              </Paper>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </LayoutBase >
  );
};