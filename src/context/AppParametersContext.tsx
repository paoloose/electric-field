import { createContext, useMemo, useState } from 'react';

type ElectricFieldParamsContext = {
  parameters: ElectricFieldReactiveParams;
  setParameters: React.Dispatch<React.SetStateAction<ElectricFieldReactiveParams>>;
};

const initialContext: ElectricFieldParamsContext = {
  parameters: {
    showGrid: false,
    movablePointCharges: false
  },
  setParameters: () => {},
};

const AppParametersContext = createContext<ElectricFieldParamsContext>(initialContext);

function CanvasContextProvider({ children }: { children: React.ReactNode }) {
  const [parameters, setParameters] = useState<ElectricFieldReactiveParams>(initialContext.parameters);

  return (
    <AppParametersContext.Provider value={
      useMemo(() => ({ parameters, setParameters }), [parameters])
    }
    >
      {children}
    </AppParametersContext.Provider>
  );
}

export { AppParametersContext, CanvasContextProvider };
