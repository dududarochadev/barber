import { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Card, Dialog, Grid, Icon, IconButton, List, ListItem, ListItemButton, ListItemText, Modal, Paper, Typography, useTheme } from '@mui/material';
import { LayoutBase, LayoutCadastro } from '../../shared/layouts';
import { Button } from '../../shared/components/MUI/button/Button';
import { useQuery } from '@tanstack/react-query';
import { ICalendario, servicoDeCalendario } from '../../shared/services/api/servicoDeCalendario';
import { servicoDeEstabelecimento } from '../../shared/services/api/servicoDeEstabelecimento';
import { servicoDeProfissional } from '../../shared/services/api/servicoDeProfissional';
import { IServico } from '../../shared/services/api/servicoDeServico';

const moedaReal = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const Agendamento: React.FC = () => {
  const [openModalServico, setOpenModalServico] = useState(false);
  const [horarioSelecionado, setHorarioSelecionado] = useState<string>();
  const [servicoSelecionado, setServicoSelecionado] = useState<IServico>();
  const [diaDoMesSelecionado, setdiaDoMesSelecionado] = useState<ICalendario>();
  const [profissionalSelecionado, setProfissionalSelecionado] = useState<number>(0);

  const carousel = useRef<HTMLElement>(null);

  const { data: dias } = useQuery(['dias'], () =>
    servicoDeCalendario.obterDias(),
  );

  const { data: estabelecimento } = useQuery(['estabelecimento'], () =>
    servicoDeEstabelecimento.obterPorId(1),
    // TROCAR O 1
  );

  const { data: horariosDisponiveis } = useQuery(['horariosDisponiveis', profissionalSelecionado, diaDoMesSelecionado], () =>
    diaDoMesSelecionado && servicoDeProfissional.listarHorariosDisponiveis(profissionalSelecionado, diaDoMesSelecionado),
  );

  useEffect(() => {
    setServicoSelecionado(estabelecimento?.servicos.find(s => s.id === 1));
  }, []);

  const handleLeftClick = () => {
    if (carousel.current) {
      carousel.current.scrollLeft -= 300;
    }
  };

  const handleRightClick = () => {
    if (carousel.current) {
      carousel.current.scrollLeft += 300;
    }
  };

  const handleClickServico = (idServico: number) => {
    setOpenModalServico(false);
    setServicoSelecionado(estabelecimento?.servicos.find(s => s.id === idServico));
  };

  return (
    <LayoutBase>
      <LayoutCadastro header='Novo agendamento'>
        <Box display='flex' flexDirection='column' gap={2}>
          <Box display='flex' alignItems='center' gap={2}>
            {servicoSelecionado &&
              <>
                <Typography variant='h5'>Serviço:</Typography>

                <Box
                  display='flex'
                  flexDirection='row'
                  justifyContent='space-between'
                  alignItems='center'
                  component={Paper}
                  variant='elevation'
                  padding={2}
                  gap={2}
                  width={250}
                >
                  <Typography>{servicoSelecionado?.descricao} - {moedaReal.format(servicoSelecionado?.valor)}</Typography>

                  <IconButton onClick={() => setOpenModalServico(true)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </Box>
              </>
            }
          </Box>
          <Typography variant='h5'>Profissional:</Typography>

          <Grid container spacing={2} flexWrap='wrap'>
            {estabelecimento?.profissionais.map((item) =>
              <Grid item xs={6} md={4} lg={3} key={item.id}>
                <Card
                  variant='elevation'
                  raised={item.id === profissionalSelecionado}
                  onClick={() => setProfissionalSelecionado(item.id)}
                >
                  <Box
                    display='flex'
                    flexDirection='row'
                    justifyContent='space-between'
                    alignItems='center'
                    padding={2}
                    gap={2}
                  >
                    <Avatar variant='square' sx={{ width: 50, height: 50 }} />

                    <Box display='flex' flexDirection='column' justifyContent='end' alignItems='end'>
                      <Typography align='center'>{item.nome}</Typography>

                      {item.id !== 0 && (
                        <Button label='Ver perfil' variant='text' minWidth={0} sx={{ padding: 0, fontSize: 10, textDecoration: 'underline', color: '#3BACEC' }} />
                      )}
                    </Box>
                  </Box>
                </Card>
              </Grid>
            )}
          </Grid>

          <Box display='flex' alignItems='center' gap={2}>
            <IconButton onClick={handleLeftClick}>
              <Icon>arrow_back</Icon>
            </IconButton>

            <Box
              display='flex'
              alignItems='center'
              overflow='hidden'
              sx={{ scrollBehavior: 'smooth' }}
              gap={1}
              ref={carousel}
            >
              {dias && dias.map((dia) =>
                <Box
                  key={dia.diaDoMes}
                  display='flex'
                  flexDirection='column'
                  justifyContent='center'
                  alignItems='center'
                  component='span'
                  onClick={() => setdiaDoMesSelecionado(dia)}
                  sx={{
                    backgroundColor: dia === diaDoMesSelecionado ? '#c2185b' : 'none',
                    cursor: 'pointer'
                  }}
                  padding={1}
                  borderRadius={1}
                  draggable
                >
                  <Typography color={dia === diaDoMesSelecionado ? 'secondary' : 'primary'}>{dia.diaDaSemana}</Typography>

                  <Box display='flex' alignItems='center'>
                    <Typography color={dia === diaDoMesSelecionado ? 'secondary' : 'primary'} fontSize={16} fontWeight='bold'>{dia.diaDoMes}</Typography>
                    <Typography color={dia === diaDoMesSelecionado ? 'secondary' : 'primary'} fontSize={12}>/{dia.mes}</Typography>
                  </Box>
                </Box>
              )}
            </Box>

            <IconButton onClick={handleRightClick}>
              <Icon>arrow_forward</Icon>
            </IconButton>
          </Box>

          <Typography variant='h6'>Horários disponíveis:</Typography>

          <Box display='flex' alignItems='center' gap={2} flexWrap='wrap'>
            {horariosDisponiveis && horariosDisponiveis.map((item) =>
              <Button
                key={item}
                label={item}
                onClick={() => setHorarioSelecionado(item)}
                variant={item === horarioSelecionado ? 'contained' : 'outlined'}
                color='primary'
                size='large'
                borderRounded={false}
              />
            )}
          </Box>
        </Box>

        <Dialog
          open={openModalServico}
          onClose={() => setOpenModalServico(false)}
        >
          <Box width={400} maxHeight={500} overflow='auto'>
            {estabelecimento?.servicos.map((item) =>
              <>
                <List>
                  <ListItemButton
                    key={item.id}
                    onClick={() => handleClickServico(item.id)}
                    divider
                  >
                    <ListItemText>
                      {item.descricao} - {moedaReal.format(item.valor)}
                    </ListItemText>
                  </ListItemButton>
                </List>
              </>
            )}
          </Box>
        </Dialog>
      </LayoutCadastro>
    </LayoutBase>
  );
};
