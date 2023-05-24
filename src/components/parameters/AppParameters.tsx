import { useAppsParameters } from '@/hooks/useAppsParameters';
import './AppParameters.scss';

function CanvasParameters() {
  const {
    parameters,
    toggleShowGrid,
    toggleMovableCharges,
    toggleShowElectricField,
  } = useAppsParameters();

  return (
    <section id="electric-field-parameters">
      <div>
        <h1>Electric Field visualization</h1>
        <form>
          <label htmlFor="show-grid">
            <input
              type="checkbox"
              id="show-grid"
              checked={parameters.showGrid}
              onChange={toggleShowGrid}
            />
            Show grid
          </label>
          <label htmlFor="movable-point-charges">
            <input
              type="checkbox"
              id="movable-point-charges"
              checked={parameters.movablePointCharges}
              onChange={toggleMovableCharges}
            />
            Movable
          </label>
          <label htmlFor="show-electric-field">
            <input
              type="checkbox"
              id="show-electric-field"
              checked={parameters.showElectricField}
              onChange={toggleShowElectricField}
            />
            Show electric field
          </label>
        </form>
      </div>
    </section>
  );
}

export default CanvasParameters;
