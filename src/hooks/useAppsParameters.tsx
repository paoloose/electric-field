import { useContext } from 'react';
import { appParametersContext } from '../context/AppParametersContext';

export function useAppsParameters() {
  return useContext(appParametersContext);
}
