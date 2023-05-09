import ElectricFieldCanvas from '@/components/canvas/ElectricFieldCanvas';
import AppParameters from '@/components/parameters/AppParameters';
import { CanvasContextProvider } from '@/context/AppParametersContext';
import '@/styles/App.scss';

function App() {

  const graph: ElectricFieldGraph = {
    isDragging: false,
    lastMouseCoords: { mouse_x: 0, mouse_y: 0 },
    view: { x: 0, y: 0 },
    zoom: 1,
    showGrid: true,
    pointCharges: [],
  }

  return (
    <CanvasContextProvider>
      <main id="app">
        <ElectricFieldCanvas graphState={graph} />
        <AppParameters />
      </main>
    </CanvasContextProvider>
  );
}

export default App;
