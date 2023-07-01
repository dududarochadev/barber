import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Box, Dialog, Popover } from '@mui/material';
import { useRef, useState } from 'react';
import { Button } from '../../../shared/components/MUI/button/Button';
import { IEstabelecimento } from '../../../shared/services/api/servicoDeEstabelecimento';
import { LayoutCadastro } from '../../../shared/layouts';
import { Listagem } from '../../../shared/components/Barber/listagem/Listagem';

interface IProps {
  estabelecimento: IEstabelecimento
}

export const MeuEstabelecimentoProfissionais: React.FC<IProps> = ({ estabelecimento }) => {
  const [anchorElProfilePopoverNovo, setAnchorElProfilePopoverNovo] = useState<null | HTMLElement>(null);
  const [openDialogNovoProfissional, setOpenDialogNovoProfissional] = useState(false);
  const [openDialogNovoProfissionalBarberApp, setOpenDialogNovoProfissionalBarberApp] = useState(false);

  const isPopoverNovoOpen = Boolean(anchorElProfilePopoverNovo);

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
        <LayoutCadastro>
          Teste
        </LayoutCadastro>
      </Dialog>

      <Dialog
        open={openDialogNovoProfissionalBarberApp}
        onClose={() => setOpenDialogNovoProfissionalBarberApp(false)}
      >
        <LayoutCadastro>
          Teste
        </LayoutCadastro>
      </Dialog>
    </Box>
  );
};