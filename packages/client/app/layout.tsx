import type { Metadata } from 'next';
import { ThemeProvider } from "@/components/theme-provider";

import{ LayoutHeader } from '@/components/layout/layout-header';
import { LayoutMain } from '@/components/layout/layout-main';
import { LayoutFooter } from '@/components/layout/layout-footer';
import '../styles/index.scss';


export const metadata: Metadata = {
  title: 'Smart Toolkits',
  description: 'Your personal intelligent toolbox for organizing bookmarks, saving articles, and more.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
      <head />
      <body>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className={'app-layout-wrapper'}>
          <LayoutHeader />
          <LayoutMain>{children}</LayoutMain>
          <LayoutFooter />
        </div>
      </ThemeProvider>
      </body>
      </html>
    </>
  )
}

