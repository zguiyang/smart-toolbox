import { AiOutlineGithub } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import { ThemeModeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';

export function LayoutHeader() {
  return (
    <header className={'app-layout-header'}>
      <div className={'left-container'}>
        <h1 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-2xl">Smart Utils</h1>
      </div>
      <div className={'center-container'}>
        <nav className={'flex items-center space-x-4 nav-list'}>
          <Link
            to={'/'}
            className={
              'px-4 py-2 rounded-full text-center text-sm transition-colors hover:text-primary bg-muted-foreground font-medium'
            }
          >
            Websites
          </Link>
          <Link
            to={'/favorites'}
            className={
              'px-4 py-2 rounded-full text-center text-sm transition-colors hover:text-primary text-muted-foreground'
            }
          >
            Favorites
          </Link>
          <Link
            to={'/utilities'}
            className={
              'px-4 py-2 rounded-full text-center text-sm transition-colors hover:text-primary text-muted-foreground'
            }
          >
            Utilities
          </Link>
        </nav>
      </div>
      <div className={'right-container'}>
        <ThemeModeToggle />
        <Button variant={'outline'} size={'icon'}>
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
