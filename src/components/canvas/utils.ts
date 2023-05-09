export function graphPointToScreenCoord(graph: ElectricFieldGraph, point: Point): MouseCoord {
  return {
    mouse_x: + (point.x - graph.view.x) * graph.zoom,
    mouse_y: - (point.y - graph.view.y) * graph.zoom,
  }
}

export function screenCoordToGraphPoint(graph: ElectricFieldGraph, mouseCoord: MouseCoord): Point {
  return {
    x: graph.view.x + mouseCoord.mouse_x / graph.zoom,
    y: graph.view.y - mouseCoord.mouse_y / graph.zoom,
  }
}

export function getMouseCoords(event: React.PointerEvent<HTMLCanvasElement> | PointerEvent | WheelEvent, canvas: HTMLCanvasElement): MouseCoord {
  const rect = canvas.getBoundingClientRect();
  return {
    mouse_x: event.clientX - rect.left,
    mouse_y: event.clientY - rect.top,
  };
}

export function getCanvasContext2D(canvas: HTMLCanvasElement | null): CanvasRenderingContext2D | null {
  if (!canvas) return null;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  return ctx;
}
