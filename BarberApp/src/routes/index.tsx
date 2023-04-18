import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PaginaInicial, Agendamentos, Perfil, Login } from '../pages';
import { Estabelecimentos } from '../pages/estabelecimentos/Estabelecimentos';
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
        icon: 'calendar_month',
        label: 'Agendamentos',
        path: '/agendamentos'
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
      <Route path="/pagina-inicial" element={<PaginaInicial />} />
      <Route path="/agendamentos" element={<Agendamentos />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/estabelecimentos" element={<Estabelecimentos />} />
      <Route path="/login" element={<Login />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />}></Route>
    </Routes>
  );
};