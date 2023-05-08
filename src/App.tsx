import ElectricFieldCanvas from '@/components/canvas/ElectricFieldCanvas';
import AppParameters from '@/components/parameters/AppParameters';
import { CanvasContextProvider } from '@/context/AppParametersContext';
import '@/styles/App.scss';

function App() {

  const initialGraph = {
    isDragging: false,
    lastMouseCoords: { mouse_x: 0, mouse_y: 0 },
    viewport: { x: 0, y: 0 },
    zoom: 1,
    pointCharges: [],
  }

  return (
    <CanvasContextProvider>
      <main id="app">
        <ElectricFieldCanvas initialGraph={initialGraph} />
        <AppParameters />
      </main>
    </CanvasContextProvider>
  );
}

export default App;
