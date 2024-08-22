import { ThemeModeToggle } from '@/components/theme/theme-toggle';

export function LayoutHeader() {
  return (
    <header className={'app-layout-header'}>
      <div className={'left-container'}></div>
      <div className={'center-container'}></div>
      <div className={'left-container'}>
        <ThemeModeToggle />
      </div>
    </header>
  );
}
