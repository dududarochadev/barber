import { FormHandles } from '@unform/core';
import { LayoutBase, LayoutCadastro } from '../../shared/layouts';
import { Form } from '@unform/web';
import { Icon, Tab, Tabs } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import { MeuEstabelecimentoInformacoes, MeuEstabelecimentoProfissionais, MeuEstabelecimentoServicos } from './pages';
import { useQuery } from '@tanstack/react-query';
import { servicoDeProprietario } from '../../shared/services/api/servicoDeProprietario';
import { useUserContext } from '../../shared/contexts/UserContext';
import { servicoDeEstabelecimento } from '../../shared/services/api/servicoDeEstabelecimento';

export const MeuEstabelecimento: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [esconderBotaoSalvar, setEsconderBotaoSalvar] = useState(false);
  const { idUsuario } = useUserContext();

  const { data: proprietario } = useQuery(['proprietario'], () =>
    servicoDeProprietario.obterPorId(idUsuario),
  );

  const { data: estabelecimento } = useQuery(['estabelecimento', proprietario], () =>
    proprietario && servicoDeEstabelecimento.obterPorId(proprietario.estabelecimentoId),
  );

  const formRef = useRef<FormHandles>(null);

  const onChangeTab = useCallback((_: any, index: number) => {
    setTabIndex(index);
    setEsconderBotaoSalvar(index !== 0);
  }, [tabIndex]);

  return proprietario ? (
    <LayoutBase>
      <LayoutCadastro
        header={
          <Tabs value={tabIndex} onChange={onChangeTab}>
            <Tab label='Informações' icon={<Icon>business</Icon>} iconPosition='start' />
            <Tab label='Serviços' icon={<Icon>build</Icon>} iconPosition='start' />
            <Tab label='Profissionais' icon={<Icon>person</Icon>} iconPosition='start' />
          </Tabs>
        }
        esconderBotaoSalvar={esconderBotaoSalvar}
      >
        <Form ref={formRef} onSubmit={console.log}>
          {tabIndex === 0 && estabelecimento && (
            <MeuEstabelecimentoInformacoes estabelecimento={estabelecimento} />
          )}

          {tabIndex === 1 && estabelecimento && (
            <MeuEstabelecimentoServicos estabelecimento={estabelecimento} />
          )}

          {tabIndex === 2 && estabelecimento && (
            <MeuEstabelecimentoProfissionais estabelecimento={estabelecimento} />
          )}
        </Form >
      </LayoutCadastro>
    </LayoutBase>
  ) : (
    <>Você não tem permissão para ver esta tela</>
  );
};