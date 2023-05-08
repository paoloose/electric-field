import { createContext, useMemo, useState } from 'react';

type ElectricFieldParamsContext = {
  parameters: ElectricFieldReactiveProps;
  setParameters: React.Dispatch<React.SetStateAction<ElectricFieldReactiveProps>>;
};

const initialContext: ElectricFieldParamsContext = {
  parameters: {
    zoom: 1,
  },
  setParameters: () => {},
};

const AppParametersContext = createContext<ElectricFieldParamsContext>(initialContext);

function CanvasContextProvider({ children }: { children: React.ReactNode }) {
  const [parameters, setParameters] = useState<ElectricFieldReactiveProps>(initialContext.parameters);

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
