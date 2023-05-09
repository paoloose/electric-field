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
