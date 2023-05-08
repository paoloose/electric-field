import { useEffect, useRef } from 'react';
import { getCanvasContext, getMouseCoords, redraw } from './utils';
import './ElectricFieldCanvas.scss';

function ElectricFieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const graph: ElectricFieldProps = useRef({
    isDragging: false,
    lastMouseCoords: { mouse_x: 0, mouse_y: 0 },
    viewport: { x: 0, y: 0 },
    zoom: 1,
  }).current;

  // Set canvas real width and height
  useEffect(() => {
    const ctx = getCanvasContext(canvasRef.current);
    if (!ctx) return;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].target.getBoundingClientRect();
      ctx.canvas.width = width;
      ctx.canvas.height = height;

      // We have that
      // x = width / zoom ; y = height / zoom
      graph.viewport.x = - (width / graph.zoom) / 2;
      graph.viewport.y = + (height / graph.zoom) / 2;

      redraw(ctx, graph);
    });

    observer.observe(ctx.canvas);

    return () => observer.disconnect();
  }, []);

  const handleZoom = (e: WheelEvent) => {
    const ctx = getCanvasContext(canvasRef.current);
    if (!ctx) return;

    const zoomIn = e.deltaY < 0;
    const zoomOut = e.deltaY > 0;

    const zoomBefore = graph.zoom;

    if (zoomIn)  graph.zoom *= 1.1;
    if (zoomOut) graph.zoom /= 1.1;

    // Zoom relative to the mouse position
    const { mouse_x, mouse_y } = getMouseCoords(e, ctx.canvas);

    // How much will the viewport move?
    const dx = mouse_x / graph.zoom - mouse_x / zoomBefore;
    const dy = mouse_y / graph.zoom - mouse_y / zoomBefore;

    // Move the viewport
    graph.viewport.x -= dx;
    graph.viewport.y += dy;

    if (e.ctrlKey) e.preventDefault();
    redraw(ctx, graph);
  }

  // Zoom in/out with mouse wheel
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener('wheel', handleZoom, { passive: false });
    return () => canvas.removeEventListener('wheel', handleZoom);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const ctx = getCanvasContext(canvasRef.current);
    if (!ctx) return;

    // const { mouse_x, mouse_y } = getMouseCoords(e, ctx.canvas);
    graph.isDragging = true;
  };

  const handlePointerMove = (e: PointerEvent) => {
    const ctx = getCanvasContext(canvasRef.current);
    if (!ctx) return;

    if (graph.isDragging) {
      // Get the canvas rect
      const { mouse_x, mouse_y } = getMouseCoords(e, ctx.canvas);
      // get mouse position difference
      const mouse_dx = mouse_x - graph.lastMouseCoords.mouse_x;
      const mouse_dy = mouse_y - graph.lastMouseCoords.mouse_y;

      // This is the amount of units that we have to move our viewport
      const dx = mouse_dx / graph.zoom;
      const dy = mouse_dy / graph.zoom;

      console.log("moving", {dx, dy})

      graph.viewport.x -= dx;
      graph.viewport.y += dy;

      redraw(ctx, graph);
    }

    graph.lastMouseCoords = getMouseCoords(e, ctx.canvas);
  };

  const handlePointerUp = () => {
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

  return (
    <section id="electric-field-canvas">
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
      />
    </section>
  );
}

export default ElectricFieldCanvas;
