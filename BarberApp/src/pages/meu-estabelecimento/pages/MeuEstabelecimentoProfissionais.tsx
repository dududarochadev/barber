import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Box, Card, Icon, IconButton, Popover, Typography } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import { Button } from '../../../shared/components/MUI/button/Button';


export const MeuEstabelecimentoProfissionais: React.FC = () => {
  const [anchorElProfileModalNovo, setAnchorElProfileModalNovo] = useState<null | HTMLElement>(null);

  const formRef = useRef<FormHandles>(null);
  const isModalNovoOpen = Boolean(anchorElProfileModalNovo);

  const openModalNovo = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorElProfileModalNovo(event.currentTarget);
  }, []);

  const closeModalNovo = useCallback(() => {
    setAnchorElProfileModalNovo(null);
  }, []);

  return (
    <Form ref={formRef} onSubmit={console.log}>
      <Box
        display='flex'
        flexDirection='column'
        gap={3}
        padding={3}
      >
        <Box display='flex' flex={1} justifyContent='end'>
          <Button
            label='+ NOVO'
            size='large'
            borderRounded={false}
            onClick={(e) => openModalNovo(e)}
          />

          <Popover
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            anchorEl={anchorElProfileModalNovo}
            open={isModalNovoOpen}
            onClose={closeModalNovo}
          >
            <Box display='flex' flexDirection='column'>
              <Button borderRounded={false} sx={{ justifyContent: 'initial', color: 'gray' }} label='Profissional' />
              <Button borderRounded={false} sx={{ justifyContent: 'initial', color: 'gray' }} label='Profissional BarberApp' />
            </Box>
          </Popover>
        </Box>

        <Card
          variant='elevation'
        >
          <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
            padding={2}
            gap={2}
          >
            <Typography>Kauan</Typography>

            <IconButton>
              <Icon>edit</Icon>
            </IconButton>
          </Box>
        </Card>
      </Box>
    </Form >
  );
};