import { createContext, useState } from 'react';

type AppParameters = {
  gridSize: number;
};

const AppParametersContext = createContext<AppParameters>({
  gridSize: 0,
});

function CanvasContextProvider({ children }: { children: React.ReactNode }) {
  const [parameters, setParameters] = useState<AppParameters>({
    gridSize: 0,
  });

  return (
    <AppParametersContext.Provider value={parameters}>
      {children}
    </AppParametersContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { AppParametersContext as appParametersContext, CanvasContextProvider };
