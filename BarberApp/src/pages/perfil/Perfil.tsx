import { Avatar, Box, ButtonGroup, Grid, Icon, IconButton, Typography } from '@mui/material';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useCallback, useEffect, useRef, useState } from 'react';
import { VTextField } from '../../shared/forms';
import { LayoutBase } from '../../shared/layouts';
import { useQuery } from '@tanstack/react-query';
import { servicoDeUsuario } from '../../shared/services/api/usuario/servicoDeUsuario';
import { useUserContext } from '../../shared/contexts/UserContext';
import { Button } from '../../shared/components/MUI/button/Button';

// interface IFormData {
//   email: string;
//   cidade: string;
//   nome: string;
// }

export const Perfil: React.FC = () => {
  const [editarNome, setEditarNome] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState<string>();
  const [sexoMasculino, setSexoMasculino] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const { idUsuario } = useUserContext();

  const { data: usuario } = useQuery(
    ['usuario'],
    () => servicoDeUsuario.obterPorId(idUsuario)
  );

  useEffect(() => {
    if (usuario) {
      setSexoMasculino(usuario.sexo === 1);
      setNomeUsuario(usuario.nomeCompleto);
    }
  }, [usuario]);

  const handleSubmit = useCallback(() => {
    formRef.current?.submitForm();
  }, []);

  const handleSaveEditarNome = useCallback(() => {
    setEditarNome(false);
    handleSubmit;
  }, []);

  const handleSave = useCallback(() => {
    const dados = formRef.current?.getData();
    console.log(dados);
  }, []);

  return (
    <LayoutBase titulo='Perfil de usuário'>
      {usuario && <Form ref={formRef} onSubmit={console.log} initialData={usuario}>
        <Grid container display='flex' flexDirection='column' gap={3}>
          <Grid item xs={12} sm={8}>
            <Box>
              <Avatar src='' sx={{ width: 150, height: 150 }}>USU</Avatar>
            </Box>
          </Grid>

          <Grid item xs={12} sm={8}>
            <VTextField
              sx={{ minWidth: 400 }}
              name='nomeCompleto'
              label='Nome'
              onChange={(e) => setNomeUsuario(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveEditarNome()}
              onBlur={() => handleSaveEditarNome()} />
          </Grid>

          <Grid item xs={12} sm={8}>
            <VTextField name='email' label='E-mail' />
          </Grid>

          <Grid item xs={12} sm={8} display='flex' flexDirection='row' gap={3}>
            <VTextField name='cpf' label='CPF' />
            <VTextField name='phoneNumber' label='Telefone' />
          </Grid>

          <Grid item xs={12} sm={8} display='flex' flexDirection='row' alignItems='center' gap={2}>
            <Typography>Sexo: </Typography>
            <ButtonGroup>
              <Button
                label='Masculino'
                color='secondary'
                onClick={() => setSexoMasculino(true)} variant={sexoMasculino ? 'contained' : 'outlined'}
              />
              <Button
                label='Feminino'
                color='secondary'
                onClick={() => setSexoMasculino(true)} variant={sexoMasculino ? 'outlined' : 'contained'}
              />
            </ButtonGroup>
          </Grid>

          <Grid item xs={12} sm={8} display='flex' justifyContent='end'>
            <Button
              label='Salvar'
              variant='contained'
              minWidth={200}
              onClick={handleSave}
            />
          </Grid>
        </Grid>
      </Form >
      }
    </LayoutBase>
  );
};
