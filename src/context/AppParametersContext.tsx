import { createContext, useMemo, useState } from 'react';

type ElectricFieldParamsContext = {
  parameters: ElectricFieldReactiveParams;
  setParameters: React.Dispatch<React.SetStateAction<ElectricFieldReactiveParams>>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const initialContext: ElectricFieldParamsContext = {
  parameters: {
    showGrid: false,
    movablePointCharges: true,
    showElectricField: false,
  },
  setParameters: () => {},
};

const AppParametersContext = createContext<ElectricFieldParamsContext>(initialContext);

function CanvasContextProvider({ children }: { children: React.ReactNode }) {
  const [parameters, setParameters] = useState<ElectricFieldReactiveParams>(
    initialContext.parameters,
  );

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
