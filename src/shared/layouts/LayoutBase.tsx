import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import { BarraSuperior } from '../components/barra-superior/BarraSuperior';

type Props = {
  children?: React.ReactNode;
  titulo: string;
  barraDeFerramentas?: ReactNode;
};

export const LayoutBase: React.FC<Props> = ({ children, titulo, barraDeFerramentas }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box>
      <BarraSuperior />

      <Box height='100%' display='flex' flexDirection='column' gap={1}>
        <Box padding={1} display='flex' alignItems='center' gap={1} height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}>
          {/* {smDown &&
            <IconButton onClick={toggleDrawerOpen}>
              <Icon>menu</Icon>
            </IconButton>} */}

          <Typography
            noWrap
            variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
          >
            {titulo}
          </Typography>
        </Box>

        {
          barraDeFerramentas &&
          <Box>
            {barraDeFerramentas}
          </Box>
        }

        <Box flex={1} overflow='auto' marginLeft={theme.spacing(2)}>
          {children}
        </Box>
      </Box >
    </Box>
  );
};