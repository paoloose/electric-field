import { useEffect, useRef } from 'react';
import { doubleClickHandler } from '@/components/canvas/handlers/doubleClickHandler';
import { pointerMoveHandler } from '@/components/canvas/handlers/pointerMoveHandler';
import { rightClickHandler } from '@/components/canvas/handlers/rightClickHandler';
import { animationFrameForces, getCanvasContext, getMouseCoords, redraw } from './logic';
import './ElectricFieldCanvas.scss';

function ElectricFieldCanvas({ initialGraph }: { initialGraph: ElectricFieldProps }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const graph: ElectricFieldProps = useRef(initialGraph).current;

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

  const handlePointerDown = (_e: React.PointerEvent<HTMLCanvasElement>) => {
    const ctx = getCanvasContext(canvasRef.current);
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
    const ctx = getCanvasContext(canvasRef.current);
    if (!ctx) return;

    const animate = (dt: number) => {
      redraw(ctx, graph);
      animationFrameForces(graph, dt);
      // requestAnimationFrame(animate);
    };

    const id = setInterval(() => {
      animate(1000 / 60);
    }, 1000 / 600);

    return () => clearInterval(id);
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
