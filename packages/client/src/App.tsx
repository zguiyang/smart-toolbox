import { ThemeProvider } from '@/components/theme/theme-provider';
import { DefaultLayout } from '@/layouts';

function App() {
  return (
    <ThemeProvider defaultTheme={'light'} storageKey={'vite-ui-theme'}>
      <DefaultLayout />
    </ThemeProvider>
  );
}

export default App;
