import { getMouseCoords } from "../utils";

export const zoomHandler = (e: WheelEvent, ctx: CanvasRenderingContext2D, graph: ElectricFieldGraph) => {
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
  graph.view.x -= dx;
  graph.view.y += dy;

  if (e.ctrlKey) e.preventDefault();
}
