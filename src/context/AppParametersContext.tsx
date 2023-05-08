import { createContext, useMemo, useState } from 'react';

type ElectricFieldParamsContext = {
  parameters: ElectricFieldParams;
  setParameters: React.Dispatch<React.SetStateAction<ElectricFieldParams>>;
};

const initialContext: ElectricFieldParamsContext = {
  parameters: {
    zoom: 1,
  },
  setParameters: () => {},
};

const AppParametersContext = createContext<ElectricFieldParamsContext>(initialContext);

function CanvasContextProvider({ children }: { children: React.ReactNode }) {
  const [parameters, setParameters] = useState<ElectricFieldParams>(initialContext.parameters);

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
