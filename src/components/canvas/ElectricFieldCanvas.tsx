import { useEffect, useRef } from 'react';
import { doubleClickHandler } from '@/components/canvas/handlers/doubleClickHandler';
import { pointerMoveHandler } from '@/components/canvas/handlers/pointerMoveHandler';
import { rightClickHandler } from '@/components/canvas/handlers/rightClickHandler';
import { useAppsParameters } from '@/hooks/useAppsParameters';
import { zoomHandler } from './handlers/zoomHandler';
import { applyForcesAnimation } from './physics';
import { getCanvasContext2D } from './utils';
import { redraw } from './drawing';
import './ElectricFieldCanvas.scss';

function ElectricFieldCanvas({ graphState }: { graphState: ElectricFieldGraph }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const graph: ElectricFieldGraph = useRef(graphState).current;
  const { parameters } = useAppsParameters();

  useEffect(() => {
    graph.params = parameters;
  }, [parameters]);

  // Set canvas real width and height
  useEffect(() => {
    const ctx = getCanvasContext2D(canvasRef.current);
    if (!ctx) return;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].target.getBoundingClientRect();
      ctx.canvas.width = width;
      ctx.canvas.height = height;

      // We have that
      // x = width / zoom ; y = height / zoom
      graph.view.x = - (width / graph.zoom) / 2;
      graph.view.y = + (height / graph.zoom) / 2;
    });

    observer.observe(ctx.canvas);

    return () => observer.disconnect();
  }, []);

  // Zoom in/out with mouse wheel
  useEffect(() => {
    const ctx = getCanvasContext2D(canvasRef.current);
    if (!ctx) return;

    const handleZoom = (e: WheelEvent) => { zoomHandler(e, ctx, graph); };

    ctx.canvas.addEventListener('wheel', handleZoom, { passive: false });
    return () => ctx.canvas.removeEventListener('wheel', handleZoom);
  }, []);

  const handlePointerDown = (_e: React.PointerEvent<HTMLCanvasElement>) => {
    const ctx = getCanvasContext2D(canvasRef.current);
    if (!ctx) return;

    graph.isDragging = true;
  };

  const lastRightClick = useRef(0);
  const handleRightClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    rightClickHandler(e, canvasRef.current, graph, lastRightClick);
  }

  const handleDoubleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    doubleClickHandler(e, canvasRef.current, graph);
  };

  const handlePointerMove = (e: PointerEvent) => {
    pointerMoveHandler(e, canvasRef.current, graph);
  };

  const handlePointerUp = (_e: PointerEvent) => {
    graph.isDragging = false;
  };

  // Listen to mouse move and up events on window
  // (this improves the user experience instead of listening to the canvas)
  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    }
  }, []);

  // Animation frame
  useEffect(() => {
    const ctx = getCanvasContext2D(canvasRef.current);
    if (!ctx) return;

    const animate = (dt: DOMHighResTimeStamp) => {
      if (graph.params.movablePointCharges) {
        applyForcesAnimation(graph, dt);
      }
      redraw(ctx, graph);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  return (
    <section id="electric-field-canvas">
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onContextMenu={handleRightClick}
        onDoubleClick={handleDoubleClick}
      />
    </section>
  );
}

export default ElectricFieldCanvas;
