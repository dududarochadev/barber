import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard, Agendamentos, Perfil } from '../pages';
import { Estabelecimentos } from '../pages/estabelecimentos/Estabelecimentos';
import { useMenuContext } from '../shared/contexts';

export const AppRoutes = () => {
  const { setMenuOptions } = useMenuContext();

  useEffect(() => {
    setMenuOptions([
      {
        icon: 'person',
        label: 'Perfil',
        path: '/perfil'
      },
      {
        icon: 'home',
        label: 'Página inicial',
        path: '/pagina-inicial'
      },
      {
        icon: 'calendar_month',
        label: 'Agendamentos',
        path: '/agendamentos'
      }
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path="/agendamentos" element={<Agendamentos />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/estabelecimentos" element={<Estabelecimentos />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />}></Route>
    </Routes>
  );
};