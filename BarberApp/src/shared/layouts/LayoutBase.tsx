import { Box, Container, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import { BarraSuperior } from '../components/Barber/barra-superior/BarraSuperior';

type Props = {
  children?: React.ReactNode;
  titulo?: string;
  barraDeFerramentas?: ReactNode;
};

export const LayoutBase: React.FC<Props> = ({ children, titulo, barraDeFerramentas }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box>
      <BarraSuperior />

      <Box height='100%' display='flex' flexDirection='column' padding={3}>
        <main style={{ flexGrow: 1, maxWidth: 'lg' }}>
          <Container maxWidth='lg'>
            {titulo &&
              <Box display='flex' justifyContent='center'>
                <Paper
                  variant='outlined'
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 28,
                    minWidth: theme.spacing(50),
                    padding: 1,
                    marginBottom: 3
                  }}>
                  <Typography noWrap variant={smDown ? 'h6' : mdDown ? 'h5' : 'h4'}>
                    {titulo}
                  </Typography>
                </Paper>
              </Box>
            }

            {barraDeFerramentas &&
              <Box marginBottom={2}>
                {barraDeFerramentas}
              </Box>
            }

            {children}
          </Container>
        </main>
      </Box >
    </Box>
  );
};