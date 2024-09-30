import { Outlet } from 'react-router-dom';

export function LayoutMain() {
  return (
    <main className={'app-layout-main'}>
      <Outlet />
    </main>
  );
}
