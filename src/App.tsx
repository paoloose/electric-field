import ElectricFieldCanvas from '@/components/canvas/ElectricFieldCanvas';
import AppParameters from '@/components/parameters/AppParameters';
import { CanvasContextProvider } from '@/context/AppParametersContext';
import '@/styles/App.scss';

function App() {
  return (
    <CanvasContextProvider>
      <main id="app">
        <ElectricFieldCanvas />
        <AppParameters />
      </main>
    </CanvasContextProvider>
  );
}

export default App;
