import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { VTextField } from '../../../shared/forms';
import { useRef, useState } from 'react';
import { Box, Avatar, IconButton, Icon } from '@mui/material';

export const MeuEstabelecimentoInformacoes: React.FC = () => {
  const [editarPerfil, setEditarPerfil] = useState(false);

  const formRef = useRef<FormHandles>(null);

  return (
    <Form ref={formRef} onSubmit={console.log}>
      <Box
        display='flex'
        flexDirection='column'
        gap={3}
        padding={3}
      >
        <Box display='flex' justifyContent='space-between'>
          <Avatar src='' sx={{ width: 150, height: 150 }}>USU</Avatar>

          <Box>
            <IconButton onClick={() => setEditarPerfil(true)}>
              <Icon>edit</Icon>
            </IconButton>
          </Box>
        </Box>

        <VTextField name='nome' label='Nome' disabled={!editarPerfil} />
        <VTextField name='email' label='E-mail' disabled={!editarPerfil} />

        <Box display='flex' flexDirection='row' gap={3}>
          <VTextField name='cpf' label='CPF' disabled={!editarPerfil} />
          <VTextField name='telefone' label='Telefone' disabled={!editarPerfil} />
        </Box>
      </Box>
    </Form >
  );
};