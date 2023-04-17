import { FormHandles } from '@unform/core';
import { LayoutBase } from '../../shared/layouts';
import { Form } from '@unform/web';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import { VTextField } from '../../shared/forms';
import { useRef } from 'react';
import { Button } from '../../shared/components/MUI/button/Button';


export const Estabelecimentos: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  return (
    <LayoutBase>
      <Form ref={formRef} onSubmit={console.log}>
        <Grid container display='flex' flexDirection='column' gap={3}>
          <Grid item xs={12} sm={8}>
            <Box display='flex' flexDirection='row' gap={2} flex={1} alignItems='center'>
              <Avatar src='' sx={{ width: 100, height: 100 }}>USU</Avatar>

              <VTextField
                sx={{ minWidth: 400 }}
                name='nome'
                label='Nome'
              />
            </Box>
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
          </Grid>

          <Grid item xs={12} sm={8} display='flex' justifyContent='end'>
            <Button
              label='Salvar'
              variant='contained'
              minWidth={200}
            />
          </Grid>
        </Grid>
      </Form >
    </LayoutBase>
  );
};