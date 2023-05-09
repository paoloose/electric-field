import { useContext } from 'react';
import { AppParametersContext } from '../context/AppParametersContext';

export function useAppsParameters() {
  const { parameters, setParameters } = useContext(AppParametersContext);

  return {
    parameters,
    toggleShowGrid: () => setParameters({
      ...parameters, showGrid: !parameters.showGrid
    }),
    toggleMovableCharges: () => setParameters({
      ...parameters, movablePointCharges: !parameters.movablePointCharges
    }),
    toggleShowElectricField: () => setParameters({
      ...parameters, showElectricField: !parameters.showElectricField
    }),
  };
}
