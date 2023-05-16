import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useCallback, useRef, useState } from 'react';
import { Button } from '../../../shared/components/MUI/button/Button';
import { Box, Popover, Card, Typography, IconButton, Icon, List, ListItem, ListItemText, ListItemButton, Collapse } from '@mui/material';


export const MeuEstabelecimentoServicos: React.FC = () => {
  const [anchorElProfileModalNovo, setAnchorElProfileModalNovo] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

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
          />
        </Box>

        <Box display='flex' flexDirection='column'>
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
              <Typography>Corte masculino</Typography>

              <IconButton>
                <Icon>edit</Icon>
              </IconButton>
            </Box>
          </Card>

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
              <Typography>Corte masculino</Typography>

              <IconButton>
                <Icon>edit</Icon>
              </IconButton>
            </Box>
          </Card>
        </Box>
      </Box>
    </Form >
  );
};