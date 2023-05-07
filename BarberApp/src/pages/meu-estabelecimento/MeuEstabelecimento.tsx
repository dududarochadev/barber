import { FormHandles } from '@unform/core';
import { LayoutBase, LayoutCadastro } from '../../shared/layouts';
import { Form } from '@unform/web';
import { Icon, Paper, Tab, Tabs, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { MeuEstabelecimentoInformacoes } from './pages/MeuEstabelecimentoInformacoes';
import { MeuEstabelecimentoProfissionais } from './pages/MeuEstabelecimentoProfissionais';


export const MeuEstabelecimento: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const formRef = useRef<FormHandles>(null);

  return (
    <LayoutBase>
      <LayoutCadastro
        header={
          <Tabs value={tabIndex} onChange={(_, index) => setTabIndex(index)}>
            <Tab label='Informações' icon={<Icon>business</Icon>} iconPosition='start' />
            <Tab label='Profissionais' icon={<Icon>person</Icon>} iconPosition='start' />
            <Tab label='Serviços' icon={<Icon>build</Icon>} iconPosition='start' />
          </Tabs>}
      >
        <Form ref={formRef} onSubmit={console.log}>
          {tabIndex === 0 && (
            <MeuEstabelecimentoInformacoes />
          )}

          {tabIndex === 1 && (
            <MeuEstabelecimentoProfissionais />
          )}

          {tabIndex === 2 && (
            <></>
          )}
        </Form >
      </LayoutCadastro>
    </LayoutBase>
  );
};