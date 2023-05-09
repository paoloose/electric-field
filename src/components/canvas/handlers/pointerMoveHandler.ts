import { getMouseCoords, redraw } from "../logic";

export function pointerMoveHandler(e: PointerEvent, canvas: HTMLCanvasElement | null, graph: ElectricFieldGraph) {
  const ctx = canvas?.getContext("2d");
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

    graph.view.x -= dx;
    graph.view.y += dy;

    redraw(ctx, graph);
  }

  graph.lastMouseCoords = getMouseCoords(e, ctx.canvas);
}
