import { Box, Container, Typography, useMediaQuery, useTheme } from '@mui/material';
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
              <Box
                padding={1}
                display='flex'
                alignItems='center'
                gap={1}
                height={theme.spacing(smDown ? 4 : mdDown ? 6 : 8)}
              >
                <Typography noWrap variant={smDown ? 'h6' : mdDown ? 'h5' : 'h4'}>
                  {titulo}
                </Typography>
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