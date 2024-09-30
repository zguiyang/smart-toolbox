import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useTheme } from './theme-provider';

const isAppearanceTransition =
  'startViewTransition' in document && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function ThemeModeToggleButton() {
  const { theme: currentTheme, setTheme } = useTheme();

  function toggleThemeAnimation(event?: React.MouseEvent) {
    let isDark = currentTheme === 'dark';
    if (currentTheme === 'system') {
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    if (!isAppearanceTransition || !event) {
      setTheme(isDark ? 'light' : 'dark');
      return;
    }
    const x = event.clientX;
    const y = event.clientY;
    // const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px at ${x}px ${y}px)`,
    ];

    const transition = document.startViewTransition(async () => {
      setTheme(isDark ? 'light' : 'dark');
    });
    transition.ready.then(() => {
      // const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];
      document.documentElement.animate(
        {
          clipPath: isDark ? clipPath.reverse() : clipPath,
        },
        {
          duration: 400,
          easing: 'ease-in',
          // pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)',
          pseudoElement: `::view-transition-${isDark ? 'old' : 'new'}(root)`,
        }
      );
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={(e) => toggleThemeAnimation(e)}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => toggleThemeAnimation(e)}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
