import { useContext } from 'react';
import { AppParametersContext } from '../context/AppParametersContext';

export function useAppsParameters() {
  const { parameters, setParameters } = useContext(AppParametersContext);

  return {
    parameters,
    toggleShorGrid: () => setParameters({
      ...parameters, showGrid: !parameters.showGrid
    }),
    toggleMovableCharges: () => setParameters({
      ...parameters, movablePointCharges: !parameters.movablePointCharges
    }),
  };
}
