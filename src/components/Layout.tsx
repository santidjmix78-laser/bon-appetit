import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav';

const HIDE_NAV = ['/recomendar', '/cocinar'];

export function Layout() {
  const { pathname } = useLocation();
  const hideNav =
    HIDE_NAV.some((p) => pathname.startsWith(p)) ||
    pathname.includes('/cocinar');

  return (
    <div className={`app-shell${hideNav ? ' app-shell--no-nav' : ''}`}>
      <main className="app-main">
        <Outlet />
      </main>
      {!hideNav && <BottomNav />}
    </div>
  );
}
