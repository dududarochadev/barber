import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Box, Dialog, Popover, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { Button } from '../../../shared/components/MUI/button/Button';
import { IEstabelecimento } from '../../../shared/services/api/servicoDeEstabelecimento';
import { LayoutCadastro } from '../../../shared/layouts';
import { Listagem } from '../../../shared/components/Barber/listagem/Listagem';
import { VTextField } from '../../../shared/forms';

interface IProps {
  estabelecimento: IEstabelecimento
}

export const MeuEstabelecimentoServicos: React.FC<IProps> = ({ estabelecimento }) => {
  const [openDialogNovoServico, setOpenDialogNovoServico] = useState(false);
  const [idServico, setIdServico] = useState(0);

  const formRef = useRef<FormHandles>(null);

  return (
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
          onClick={() => setOpenDialogNovoServico(true)}
        />
      </Box>

      <Listagem
        lista={estabelecimento.servicos.map((item) => ({ id: item.id, descricao: item.descricao }))}
        onClickEdit={() => null}
      />

      <Dialog
        open={openDialogNovoServico}
        onClose={() => setOpenDialogNovoServico(false)}
      >
        <Form ref={formRef} onSubmit={() => null}>
          <LayoutCadastro header='Novo serviço'>
            <Box display='flex' flexDirection='column' gap={2}>
              <VTextField name='descricao' label='Descrição' />
              <VTextField name='valor' label='Valor' type='number' />
              <VTextField name='duracaoServico' label='Duração do servico' type='number' />
            </Box>
          </LayoutCadastro>
        </Form>
      </Dialog>
    </Box>
  );
};