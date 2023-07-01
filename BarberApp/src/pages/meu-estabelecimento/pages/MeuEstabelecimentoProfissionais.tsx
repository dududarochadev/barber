import { FormHandles, Scope } from '@unform/core';
import { Form } from '@unform/web';
import { Box, Card, Dialog, Popover, TextField, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { Button } from '../../../shared/components/MUI/button/Button';
import { IEstabelecimento } from '../../../shared/services/api/servicoDeEstabelecimento';
import { LayoutCadastro } from '../../../shared/layouts';
import { Listagem } from '../../../shared/components/Barber/listagem/Listagem';
import { VTextField } from '../../../shared/forms';
import { VAutocomplete } from '../../../shared/forms/VAutocomplete';
import { loadOptions } from '@babel/core';
import { servicoDeServico } from '../../../shared/services/api/servicoDeServico';
import { useQuery } from '@tanstack/react-query';

interface IProps {
  estabelecimento: IEstabelecimento
}

export const MeuEstabelecimentoProfissionais: React.FC<IProps> = ({ estabelecimento }) => {
  const [anchorElProfilePopoverNovo, setAnchorElProfilePopoverNovo] = useState<null | HTMLElement>(null);
  const [openDialogNovoProfissional, setOpenDialogNovoProfissional] = useState(false);
  const [openDialogNovoProfissionalBarberApp, setOpenDialogNovoProfissionalBarberApp] = useState(false);
  const [idProfissional, setIdProfissional] = useState(0);

  const formRef = useRef<FormHandles>(null);
  const isPopoverNovoOpen = Boolean(anchorElProfilePopoverNovo);

  const { data: servicos } = useQuery(['servicos'], () =>
    servicoDeServico.listarPorEstabelecimento(estabelecimento.id),
  );

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
          onClick={(e) => setAnchorElProfilePopoverNovo(e.currentTarget)}
        />

        <Popover
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          anchorEl={anchorElProfilePopoverNovo}
          open={isPopoverNovoOpen}
          onClose={() => setAnchorElProfilePopoverNovo(null)}
        >
          <Box display='flex' flexDirection='column'>
            <Button onClick={() => setOpenDialogNovoProfissional(true)} borderRounded={false} sx={{ justifyContent: 'initial', color: 'white' }} label='Profissional' />
            <Button onClick={() => setOpenDialogNovoProfissionalBarberApp(true)} borderRounded={false} sx={{ justifyContent: 'initial', color: 'white' }} label='Profissional BarberApp' />
          </Box>
        </Popover>
      </Box>

      <Listagem
        lista={estabelecimento.profissionais.map((item) => ({ id: item.id, descricao: item.nome }))}
        onClickEdit={() => null}
      />

      <Dialog
        open={openDialogNovoProfissional}
        onClose={() => setOpenDialogNovoProfissional(false)}
      >
        <Form ref={formRef} onSubmit={() => null}>
          <LayoutCadastro header='Novo profissional'>
            <Box display='flex' flexDirection='column' gap={2}>
              <VTextField name='nome' label='Nome profissional' />

              <Box component={Card} variant='outlined' padding={2}>
                <Typography align='center' variant='h6' sx={{ marginBottom: 1 }}>Serviços</Typography>
                <Scope key="" path={'profissionalServicos[0]'}>
                  <Box padding={1} display='flex' gap={1}>
                    <VAutocomplete name='servicoId' label='Serviço' options={servicos || []} />
                    <VTextField name='duracaoServicoProfissional' label='Duração do serviço (minutos)' type='number' />
                  </Box>
                </Scope>

                <Box display='flex' justifyContent='center'>
                  <Button label='+ ADICIONAR' onClick={() => null} /> {/** OnClick vai adicionar um objeto vazio no array de servico */}
                </Box>
              </Box>
            </Box>
          </LayoutCadastro>
        </Form>
      </Dialog>

      <Dialog
        open={openDialogNovoProfissionalBarberApp}
        onClose={() => setOpenDialogNovoProfissionalBarberApp(false)}
      >
        <LayoutCadastro header='Novo profissional BarberApp'>
          <Box display='flex' flexDirection='column' gap={2}>
            <TextField label='Email do profissional' />
          </Box>
        </LayoutCadastro>
      </Dialog>
    </Box>
  );
};