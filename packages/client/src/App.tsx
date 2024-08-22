import { ThemeProvider } from '@/components/theme/theme-provider';
import { ModeToggle } from '@/components/theme/theme-toggle';

function App() {
  return (
    <ThemeProvider defaultTheme={'light'} storageKey={'vite-ui-theme'}>
      <ModeToggle />
    </ThemeProvider>
  );
}

export default App;
