import { clsx } from 'clsx';
import { AiOutlineGithub } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';

import { ThemeModeToggleButton } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import { menuList } from '@/menus';

import SearchCommandButton from './search-command-button';

function HeaderNavList() {
  const location = useLocation();

  return (
    <nav className={'flex items-center space-x-4 nav-list'}>
      {menuList.map((item, index) => (
        <Link
          to={item.url}
          key={`nav-link-${index}`}
          className={clsx(
            'px-4 py-2 rounded-full text-center text-sm transition-colors hover:text-primary hover:bg-muted',
            location.pathname === item.url ? 'bg-muted text-primary font-medium' : null
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

export function LayoutHeader() {
  return (
    <header className={'app-layout-header'}>
      <div className={'left-container'}>
        <h1 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-2xl">Smart Utils</h1>
      </div>
      <div className={'center-container'}>
        <HeaderNavList />
      </div>
      <div className={'right-container'}>
        <SearchCommandButton />
        <ThemeModeToggleButton />
        <Button variant={'ghost'} size={'icon'}>
          <Link to={'https://github.com/zguiyang/smart-toolkit'} target={'_blank'}>
            <AiOutlineGithub className={'text-xl'} />
          </Link>
        </Button>
        <Button variant={'default'} size={'sm'}>
          Sign In
        </Button>
      </div>
    </header>
  );
}
