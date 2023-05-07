import ElectricFieldCanvas from '@/components/canvas/ElectricFieldCanvas';
import AppParameters from '@/components/parameters/AppParameters';
import { CanvasContextProvider } from '@/context/AppParametersContext';

function App() {
  return (
    <CanvasContextProvider>
      <main>
        <ElectricFieldCanvas />
        <AppParameters />
      </main>
    </CanvasContextProvider>
  );
}

export default App;
