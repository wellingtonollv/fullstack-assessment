import AppRoutes from './routes/routes';
import { ThemeProvider } from './shared/providers/theme/ThemeProvider';

function App() {
  return (
    <>
      <ThemeProvider storageKey="fullstack-assessment-fe-theme">
        <AppRoutes />
      </ThemeProvider>
    </>
  );
}

export default App;
