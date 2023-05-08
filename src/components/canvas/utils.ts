export function graphPointToScreenCoord(graph: ElectricFieldProps, point: Point): MouseCoord {
  return {
    mouse_x: + (point.x - graph.viewport.x) * graph.zoom,
    mouse_y: - (point.y - graph.viewport.y) * graph.zoom,
  }
}

export function screenCoordToGraphPoint(graph: ElectricFieldProps, mouseCoord: MouseCoord): Point {
  return {
    x: graph.viewport.x + mouseCoord.mouse_x / graph.zoom,
    y: graph.viewport.y - mouseCoord.mouse_y / graph.zoom,
  }
}
