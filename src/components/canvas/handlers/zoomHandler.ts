import { getMouseCoords } from "../utils";

const ZOOM_ADJUSTMENT = 0.01;

export const zoomHandler = (e: WheelEvent, ctx: CanvasRenderingContext2D, graph: ElectricFieldGraph) => {
  const zoomIn = e.deltaY < 0;
  const zoomOut = e.deltaY > 0;

  const zoomBefore = graph.zoom;

  if (zoomIn)  graph.zoom += ZOOM_ADJUSTMENT;
  if (zoomOut) {
    if (graph.zoom < 0.5) {
      graph.zoom -= ZOOM_ADJUSTMENT * 0.1;
    }
    else if (graph.zoom < 0.1) {
      graph.zoom = 0.1;
    }
    else {
      graph.zoom -= ZOOM_ADJUSTMENT;
    }
  }

  // Zoom relative to the mouse position
  const { screen_x: mouse_x, screen_y: mouse_y } = getMouseCoords(e, ctx.canvas);

  // How much will the viewport move?
  const dx = mouse_x / graph.zoom - mouse_x / zoomBefore;
  const dy = mouse_y / graph.zoom - mouse_y / zoomBefore;

  // Move the viewport
  graph.view.x -= dx;
  graph.view.y += dy;

  if (e.ctrlKey) e.preventDefault();
}
