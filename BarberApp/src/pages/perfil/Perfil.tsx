import { Avatar, Box, ButtonGroup, Grid, Icon, IconButton, Paper, Typography } from '@mui/material';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useCallback, useEffect, useRef, useState } from 'react';
import { VTextField } from '../../shared/forms';
import { LayoutBase } from '../../shared/layouts';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../../shared/components/MUI/button/Button';
import { servicoDeAutenticacao } from '../../shared/services/api/servicoDeAutenticacao';

// interface IFormData {
//   email: string;
//   cidade: string;
//   nome: string;
// }

export const Perfil: React.FC = () => {
  const [editarPerfil, setEditarPerfil] = useState(false);
  const [sexoUsuario, setSexoUsuario] = useState<number>();

  const formRef = useRef<FormHandles>(null);
  const { data: usuario } = useQuery(
    ['usuario'],
    () => servicoDeAutenticacao.obterUsuarioDoCookie()
  );

  const handleSave = useCallback(() => {
    const dados = formRef.current?.getData();
    console.log(dados);
  }, []);

  useEffect(() => {
    usuario && setSexoUsuario(usuario.sexo);
  }, [usuario]);

  return (
    <LayoutBase>
      {usuario && <Form ref={formRef} onSubmit={console.log} initialData={usuario}>
        <Grid container spacing={3}>
          <Grid
            item
            sm={8}
          >
            <Paper
              variant='outlined'
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                padding: 3,
              }}
            >
              <Box display='flex' justifyContent='space-between'>
                <Avatar src={'assets/images/fotos-de-perfil/Floripa.jpg'} sx={{ width: 150, height: 150 }}>USU</Avatar>

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

              <Box display='flex' flexDirection='row' alignItems='center' gap={2}>
                <Typography>Sexo: </Typography>
                <ButtonGroup>
                  <Button
                    label='Masculino'
                    color='secondary'
                    disabled={!editarPerfil}
                    onClick={() => setSexoUsuario(1)} variant={sexoUsuario === 1 ? 'contained' : 'outlined'}
                  />
                  <Button
                    label='Nenhum'
                    color='secondary'
                    disabled={!editarPerfil}
                    onClick={() => setSexoUsuario(0)} variant={sexoUsuario === 0 ? 'contained' : 'outlined'}
                  />
                  <Button
                    label='Feminino'
                    color='secondary'
                    disabled={!editarPerfil}
                    onClick={() => setSexoUsuario(2)} variant={sexoUsuario === 2 ? 'contained' : 'outlined'}
                  />
                </ButtonGroup>
              </Box>

              <Box display='flex' justifyContent='end'>
                <Button
                  label='Salvar'
                  variant='contained'
                  minWidth={200}
                  onClick={handleSave}
                />
              </Box>
            </Paper>
          </Grid>

          <Grid item sm={4}>
            <Paper variant='outlined'>
              <Box height={800}>
                <Typography variant='h6'>Meus locais preferidos </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Form >
      }
    </LayoutBase>
  );
};
