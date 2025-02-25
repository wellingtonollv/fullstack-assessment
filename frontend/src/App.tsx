import AppRoutes from './routes/routes';
import { ModalProvider } from './shared/providers/modal/ModalProvider';
import { ThemeProvider } from './shared/providers/theme/ThemeProvider';

function App() {
  return (
    <>
      <ThemeProvider storageKey="fullstack-assessment-fe-theme">
        <ModalProvider>
        <AppRoutes />
        </ModalProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
