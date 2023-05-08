import { useState } from 'react';
import './AppParameters.scss';

function CanvasParameters() {
  const [parameter, setParameter] = useState(0);

  return (
    <section id="electric-field-parameters">
      <div>
        <h2>Visualización del campo eléctrico</h2>
        <form>
          <label htmlFor="canvas-width">
            <span>Size</span>
            <input
              type="range"
              min="0"
              max="100"
              value={parameter}
              onChange={(e) => setParameter(Number(e.target.value))}
            />
          </label>
        </form>
      </div>
    </section>
  );
}

export default CanvasParameters;
