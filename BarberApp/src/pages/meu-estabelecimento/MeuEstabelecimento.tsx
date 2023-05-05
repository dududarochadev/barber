import { FormHandles } from '@unform/core';
import { LayoutBase } from '../../shared/layouts';
import { Form } from '@unform/web';
import { Avatar, Box, Grid, Icon, IconButton, Paper, Tab, Tabs, Typography } from '@mui/material';
import { VTextField } from '../../shared/forms';
import { useRef, useState } from 'react';
import { Button } from '../../shared/components/MUI/button/Button';
import { MeuEstabelecimentoInformacoes } from './pages/MeuEstabelecimentoInformacoes';


export const MeuEstabelecimento: React.FC = () => {
  const [editarPerfil, setEditarPerfil] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const formRef = useRef<FormHandles>(null);

  return (
    <LayoutBase>
      <Form ref={formRef} onSubmit={console.log}>
        <Paper
          variant='outlined'
        >
          <Tabs value={tabIndex} onChange={(_, index) => setTabIndex(index)}>
            <Tab label='Informações' icon={<Icon>business</Icon>} iconPosition='start' />
            <Tab label='Profissionais' icon={<Icon>person</Icon>} iconPosition='start' />
            <Tab label='Serviços' icon={<Icon>build</Icon>} iconPosition='start' />
          </Tabs>

          {tabIndex === 0 && (
            <MeuEstabelecimentoInformacoes />
          )}

          {tabIndex === 1 && (
            <></>
          )}
        </Paper>
      </Form >
    </LayoutBase>
  );
};