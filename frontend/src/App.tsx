import AppRoutes from './routes/routes';
import { Toaster } from './shared/components/ui/sonner';
import { ModalProvider } from './shared/providers/modal/ModalProvider';
import { ThemeProvider } from './shared/providers/theme/ThemeProvider';

function App() {
  return (
    <>
      <ThemeProvider storageKey="fullstack-assessment-fe-theme">
        <ModalProvider>
          <AppRoutes />
          <Toaster />
        </ModalProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
