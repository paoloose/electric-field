import { useState } from 'react';
import './AppParameters.scss';

function CanvasParameters() {
  const [parameter, setParameter] = useState(0);

  return (
    <section id="electric-field-parameters">
      <h2>Canvas Parameters</h2>
      <input
        type="range"
        min="0"
        max="100"
        value={parameter}
        onChange={(e) => setParameter(Number(e.target.value))}
      />
    </section>
  );
}

export default CanvasParameters;
