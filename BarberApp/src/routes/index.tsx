import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PaginaInicial, Perfil, Login, Agendamento, MeuEstabelecimento } from '../pages';
import { useMenuContext } from '../shared/contexts';

export const AppRoutes: React.FC = () => {
  const { setMenuOptions } = useMenuContext();

  useEffect(() => {
    setMenuOptions([
      {
        icon: 'person',
        label: 'Perfil',
        path: '/perfil'
      },
      {
        icon: 'apartment',
        label: 'Meu estabelecimento',
        path: '/estabelecimentos'
      }
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/agendamento" element={<Agendamento />} />
      <Route path="/estabelecimentos" element={<MeuEstabelecimento />} />
      <Route path="/login" element={<Login />} />
      <Route path="/pagina-inicial" element={<PaginaInicial />} />
      <Route path="/perfil" element={<Perfil />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />}></Route>
    </Routes>
  );
};