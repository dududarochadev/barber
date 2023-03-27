import { Box } from '@mui/material';
import { FormHandles, Scope } from '@unform/core';
import { Form } from '@unform/web';
import { useRef } from 'react';
import { VTextField } from '../../shared/forms';
import { LayoutBase } from '../../shared/layouts';

interface IFormData {
  email: string;
  cidade: string;
  nome: string;
}

export const Perfil: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSave = (dados: IFormData) => {
    console.log(dados);
  };
  return (
    <LayoutBase titulo='perfil'>
      <Form ref={formRef} onSubmit={console.log}>
        <Box display='flex' flexDirection='column' gap={2}>
          <VTextField name='nomeCompleto' />
          <VTextField name='login' />
          {[1, 2, 3, 4].map((_, index) => (
            <Scope key='' path={`endereco[${index}]`}>
              <VTextField name='rua' />
              <VTextField name='numero' />
            </Scope>
          ))}
        </Box>
      </Form>
    </LayoutBase >
  );
};