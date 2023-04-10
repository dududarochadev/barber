import { Avatar, Box, Button, ButtonGroup, Grid, Icon, IconButton, Typography } from '@mui/material';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useEffect, useRef, useState } from 'react';
import { VTextField } from '../../shared/forms';
import { LayoutBase } from '../../shared/layouts';
import { useQuery } from '@tanstack/react-query';
import { servicoDeUsuario } from '../../shared/services/api/usuario/servicoDeUsuario';
import { useAuthContext } from '../../shared/contexts/AuthContext';

interface IFormData {
  email: string;
  cidade: string;
  nome: string;
}

export const Perfil: React.FC = () => {
  const [editarNome, setEditarNome] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState<string>();
  const [sexoMasculino, setSexoMasculino] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const { idUsuario } = useAuthContext();

  const { data: usuario } = useQuery(
    ['usuario'],
    () => servicoDeUsuario.obterPorId(idUsuario)
  );

  useEffect(() => {
    !nomeUsuario && setNomeUsuario('Dudu da Rocha');

    !nomeUsuario ?
      formRef.current?.setData({ nomeCompleto: 'Dudu da Rocha' })
      : formRef.current?.setData({ nomeCompleto: nomeUsuario });
  }, [nomeUsuario]);

  useEffect(() => {
    formRef.current?.setData({ nomeCompleto: nomeUsuario });
  }, [nomeUsuario, formRef]);

  const handleSave = () => {
    const dados = formRef.current?.getData();
    console.log(dados);
  };

  return (
    <LayoutBase titulo='Perfil de usuário'>
      <Form ref={formRef} onSubmit={console.log}>
        <Grid container display='flex' flexDirection='column' gap={2}>
          <Grid item xs={12} sm={8}>
            <Box display='flex' flexDirection='row' gap={2} flex={1} alignItems='center'>
              <Avatar src='' sx={{ width: 100, height: 100 }}>USU</Avatar>

              {!editarNome ? (
                <Box display='flex' flexDirection='row' alignItems='center'>
                  <Typography fontSize={25}>{nomeUsuario}</Typography>
                  <IconButton onClick={() => setEditarNome(true)}><Icon>edit</Icon></IconButton>
                </Box>
              ) : (
                <VTextField
                  sx={{ minWidth: 400 }}
                  variant='standard'
                  name='nomeCompleto'
                  label='Nome'
                  onChange={(e) => setNomeUsuario(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && setEditarNome(false)} />
              )}
            </Box>
          </Grid>

          <Grid item xs={12} sm={8}>
            <VTextField name='email' label='E-mail' />
          </Grid>

          <Grid item xs={12} sm={8} display='flex' flexDirection='row' gap={3}>
            <VTextField name='cpf' label='CPF' />
            <VTextField name='telefone' label='Telefone' />
          </Grid>

          <Grid item xs={12} sm={8} display='flex' flexDirection='row' alignItems='center' gap={2}>
            <Typography>Sexo: </Typography>
            <ButtonGroup>
              <Button color='secondary' sx={{ width: 120, borderRadius: 28 }} onClick={() => setSexoMasculino(true)} variant={sexoMasculino ? 'contained' : 'outlined'}>Masculino</Button>
              <Button color='secondary' sx={{ width: 120, borderRadius: 28 }} onClick={() => setSexoMasculino(false)} variant={sexoMasculino ? 'outlined' : 'contained'}>Feminino</Button>
            </ButtonGroup>
          </Grid>

          <Grid item xs={12} sm={8} display='flex' justifyContent='end'>
            <Button variant='contained' sx={{ width: 200 }} onClick={handleSave}>Salvar</Button>
          </Grid>
        </Grid>

      </Form >
    </LayoutBase >
  );
};