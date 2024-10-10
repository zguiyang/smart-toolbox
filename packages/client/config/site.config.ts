import type { ThemeMode } from '@/components/theme/theme-provider';

export interface SiteConfig {
  title: string;
  defaultTheme: ThemeMode;
  lang: string;
}

export const siteConfig: SiteConfig = {
  title: 'Smart Toolbox',
  defaultTheme: 'system',
  lang: 'en',
};
