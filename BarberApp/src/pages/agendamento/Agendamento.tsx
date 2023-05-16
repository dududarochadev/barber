import { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Card, Grid, Icon, IconButton, Paper, Typography } from '@mui/material';
import { LayoutBase, LayoutCadastro } from '../../shared/layouts';
import { Button } from '../../shared/components/MUI/button/Button';

const horarios = ['09:00', '09:15', '09:30', '09:45', '10:00', '13:00', '15:15', '18:00', '09:12', '09:10', '09:35', '10:40', '13:10', '15:25', '18:10'];
const dias = [{
  diaSemana: 'SEG',
  diaMes: '08',
  mes: '05'
}, {
  diaSemana: 'TER',
  diaMes: '09',
  mes: '05'
}, {
  diaSemana: 'QUA',
  diaMes: '10',
  mes: '05'
}, {
  diaSemana: 'QUI',
  diaMes: '11',
  mes: '05'
}, {
  diaSemana: 'SEX',
  diaMes: '12',
  mes: '05'
}, {
  diaSemana: 'SEX',
  diaMes: '12',
  mes: '05'
}, {
  diaSemana: 'SEX',
  diaMes: '12',
  mes: '05'
}, {
  diaSemana: 'SEX',
  diaMes: '12',
  mes: '05'
}, {
  diaSemana: 'SEX',
  diaMes: '12',
  mes: '05'
}, {
  diaSemana: 'SEX',
  diaMes: '12',
  mes: '05'
}, {
  diaSemana: 'SEX',
  diaMes: '12',
  mes: '05'
}, {
  diaSemana: 'SEX',
  diaMes: '12',
  mes: '05'
}, {
  diaSemana: 'SEX',
  diaMes: '12',
  mes: '05'
}, {
  diaSemana: 'SEX',
  diaMes: '12',
  mes: '05'
}, {
  diaSemana: 'SEX',
  diaMes: '12',
  mes: '05'
}, {
  diaSemana: 'SEX',
  diaMes: '12',
  mes: '05'
}, {
  diaSemana: 'SEX',
  diaMes: '12',
  mes: '05'
}, {
  diaSemana: 'SEX',
  diaMes: '12',
  mes: '05'
}, {
  diaSemana: 'SEX',
  diaMes: '12',
  mes: '05'
}, {
  diaSemana: 'SEX',
  diaMes: '12',
  mes: '05'
}, {
  diaSemana: 'SEX',
  diaMes: '12',
  mes: '05'
}, {
  diaSemana: 'SEX',
  diaMes: '12',
  mes: '05'
}, {
  diaSemana: 'SEX',
  diaMes: '12',
  mes: '05'
}, {
  diaSemana: 'SEX',
  diaMes: '12',
  mes: '05'
}, {
  diaSemana: 'SEX',
  diaMes: '12',
  mes: '05'
}];

const profissionais = ['Sem preferência', 'Dudu', 'Kauan', 'Rafa', 'Beto'];

const servico = 'Corte Masculino';

export const Agendamento: React.FC = () => {
  const [horarioSelecionado, setHorarioSelecionado] = useState<string>();
  const [diaMesSelecionado, setDiaMesSelecionado] = useState<string>();
  const [profissionalSelecionado, setProfissionalSelecionado] = useState<string>('Sem preferência');

  const carousel = useRef<HTMLElement>(null);

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

  return (
    <LayoutBase>
      <LayoutCadastro header='Novo agendamento'>
        <Box display='flex' flexDirection='column' gap={2}>
          <Box display='flex' alignItems='center' gap={2}>
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
              <Typography>{servico}</Typography>

              <IconButton>
                <Icon>edit</Icon>
              </IconButton>
            </Box>
          </Box>

          <Typography variant='h5'>Profissional:</Typography>

          <Grid container spacing={2} flexWrap='wrap'>
            {profissionais.map((item) =>
              <Grid item xs={6} md={4} lg={3} key={item}>
                <Card
                  variant='elevation'
                  raised={item === profissionalSelecionado}
                  onClick={() => setProfissionalSelecionado(item)}
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
                      <Typography align='center'>{item}</Typography>

                      {item !== 'Sem preferência' && (
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
              {dias.map((dia) =>
                <Box
                  key={dia.diaMes}
                  display='flex'
                  flexDirection='column'
                  justifyContent='center'
                  alignItems='center'
                  component='span'
                  onClick={() => setDiaMesSelecionado(dia.diaMes)}
                  sx={{ backgroundColor: dia.diaMes === diaMesSelecionado ? '#fcedfc' : 'none', cursor: 'pointer' }}
                  padding={1}
                  borderRadius={1}
                  draggable
                >
                  <Typography color='primary'>{dia.diaSemana}</Typography>

                  <Box display='flex' alignItems='center'>
                    <Typography color='primary' fontSize={16} fontWeight='bold'>{dia.diaMes}</Typography>
                    <Typography color='primary' fontSize={12}>/{dia.mes}</Typography>
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
            {horarios.map((item) =>
              <Button key={item} label={item} onClick={() => setHorarioSelecionado(item)} variant={item === horarioSelecionado ? 'contained' : 'outlined'} size='large' borderRounded={false} />
            )}
          </Box>
        </Box>
      </LayoutCadastro>
    </LayoutBase>
  );
};
