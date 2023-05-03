import { useState } from 'react';
import { Avatar, Box, Card, Paper, Stack, Typography } from '@mui/material';
import { LayoutBase } from '../../shared/layouts';
import { DatePicker } from '@mui/x-date-pickers';
import { Button } from '../../shared/components/MUI/button/Button';
import dayjs from 'dayjs';

const horarios = ['09:00', '09:15', '09:30', '09:45', '10:00', '13:00', '15:15', '18:00', '09:12', '09:10', '09:35', '10:40', '13:10', '15:25', '18:10'];

const profissionais = ['Sem preferência', 'Dudu', 'Kauan', 'Rafa', 'Beto'];

export const Agendamento: React.FC = () => {
  const [horarioSelecionado, setHorarioSelecionado] = useState<string>();
  const [profissionalSelecionado, setProfissionalSelecionado] = useState<string>('Sem preferência');

  return (
    <LayoutBase>
      <Paper sx={{ minHeight: 700 }}>
        <Box display='flex' flexDirection='column' justifyContent='space-between' flex={1} padding={1}>
          <Box padding={3}>
            <Typography variant='h3'>Novo agendamento:</Typography>

            <Stack marginTop={3} spacing={3}>
              <Typography variant='h5'><strong>Estabelecimento:</strong> Beto Hair</Typography>


              <Typography variant='h5'>Profissionais:</Typography>
              <Box display='flex' gap={2} flexWrap='wrap'>
                {profissionais.map((item) =>
                  <Card
                    key={item}
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
                      width={250}
                    >
                      <Avatar variant='square' sx={{ width: 80, height: 80 }} />

                      <Box display='flex' flexDirection='column' justifyContent='end' alignItems='end'>
                        <Typography align='center'>{item}</Typography>
                      </Box>
                    </Box>
                  </Card>
                )}
              </Box>

              <Box display='flex' alignItems='center' gap={1}>
                <Typography variant='h6'>Data:</Typography>
                <DatePicker disablePast defaultValue={dayjs()} />
              </Box>

              <Typography variant='h6'>Horários disponíveis:</Typography>

              <Box display='flex' alignItems='center' gap={2} flexWrap='wrap'>
                {horarios.map((item) =>
                  <Button key={item} label={item} onClick={() => setHorarioSelecionado(item)} variant={item === horarioSelecionado ? 'contained' : 'outlined'} size='large' borderRounded={false} />
                )}
              </Box>
            </Stack>
          </Box>

          <Box display='flex' justifyContent='end' padding={2}>
            <Button variant='contained' label='Agendar' />
          </Box>
        </Box>
      </Paper>
    </LayoutBase>
  );
};
