import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Box, Card, Icon, IconButton, Dialog, Popover, Typography } from '@mui/material';
import { useRef, useState } from 'react';

export interface IObjetoLista {
  id: number;
  descricao: string;
}

interface IProps {
  lista: IObjetoLista[];
  onClickEdit: () => void;
}

export const Listagem: React.FC<IProps> = ({ lista, onClickEdit }) => {
  const formRef = useRef<FormHandles>(null);

  return (
    <Form ref={formRef} onSubmit={console.log}>
      {lista.map((item) =>
        <Card
          variant='elevation'
          key={item.id}
        >
          <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
            padding={2}
            gap={2}
          >
            <Typography>{item.descricao}</Typography>

            <IconButton onClick={onClickEdit}>
              <Icon>edit</Icon>
            </IconButton>
          </Box>
        </Card>
      )}
    </Form >
  );
};