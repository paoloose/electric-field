import ElectricFieldCanvas from '@/components/canvas/ElectricFieldCanvas';
import AppParameters from '@/components/parameters/AppParameters';
import { CanvasContextProvider, initialContext } from '@/context/AppParametersContext';
import '@/styles/App.scss';

function App() {
  const graph: ElectricFieldGraph = {
    isDragging: false,
    lastMouseCoords: { screen_x: 0, screen_y: 0 },
    view: { x: 0, y: 0 },
    zoom: 1e6,
    pointCharges: [],
    params: initialContext.parameters,
  };

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
