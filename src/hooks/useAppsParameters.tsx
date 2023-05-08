import { useContext } from 'react';
import { AppParametersContext } from '../context/AppParametersContext';

export function useAppsParameters() {
  const { parameters, setParameters } = useContext(AppParametersContext);

  return {
    parameters,
    setZoom: (zoom: number) => setParameters((prev) => ({ ...prev, zoom })),
  };
}
