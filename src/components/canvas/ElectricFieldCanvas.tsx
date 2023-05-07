import { useEffect, useRef } from 'react';
import './ElectricFieldCanvas.scss';

function ElectricFieldCanvas() {
  const canvaRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvaRef.current;
    if (!canvas) return;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    if (ctx) {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, 1000, 1000);
    }
  }, []);

  return (
    <section id="electric-field-canvas">
      <canvas ref={canvaRef} width={1000} height={1000} />
    </section>
  );
}

export default ElectricFieldCanvas;
