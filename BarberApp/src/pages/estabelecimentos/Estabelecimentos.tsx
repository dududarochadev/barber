import { FormHandles } from '@unform/core';
import { LayoutBase } from '../../shared/layouts';
import { Form } from '@unform/web';
import { Avatar, Box, Grid, Icon, IconButton, Paper, Tab, Tabs, Typography } from '@mui/material';
import { VTextField } from '../../shared/forms';
import { useRef, useState } from 'react';
import { Button } from '../../shared/components/MUI/button/Button';


export const Estabelecimentos: React.FC = () => {
  const [editarPerfil, setEditarPerfil] = useState(false);

  const formRef = useRef<FormHandles>(null);

  return (
    <LayoutBase>
      <Form ref={formRef} onSubmit={console.log}>
        <Paper
          variant='outlined'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            padding: 3,
          }}
        >
          {/* <Tabs>
          </Tabs> */}
          <Box display='flex' justifyContent='space-between'>
            <Avatar src='' sx={{ width: 150, height: 150 }}>USU</Avatar>

            <Box>
              <IconButton onClick={() => setEditarPerfil(true)}>
                <Icon>edit</Icon>
              </IconButton>
            </Box>
          </Box>

          <VTextField name='nomeCompleto' label='Nome' disabled={!editarPerfil} />
          <VTextField name='email' label='E-mail' disabled={!editarPerfil} />

          <Box display='flex' flexDirection='row' gap={3}>
            <VTextField name='cpf' label='CPF' disabled={!editarPerfil} />
            <VTextField name='telefone' label='Telefone' disabled={!editarPerfil} />
          </Box>

          <Box display='flex' justifyContent='end'>
            <Button
              label='Salvar'
              variant='contained'
              minWidth={200}
            />
          </Box>
        </Paper>
      </Form >
    </LayoutBase>
  );
};