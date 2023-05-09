// (screen_x, screen_y): means a coordinate on the canvas (in pixels)
// (x, y): means a cartesian coordinate on the graph

interface ElectricFieldReactiveParams {
  showGrid: boolean;
  movablePointCharges: boolean;
}

interface Point {
  x: number;
  y: number;
}

interface MouseCoord {
  screen_x: number;
  screen_y: number;
}

interface PointCharge {
  x: number;
  y: number;
  charge: number;
  velocity: Vector;
}

interface ElectricFieldGraph {
  isDragging: boolean;
  lastMouseCoords: MouseCoord;
  view: Point;
  zoom: number;
  pointCharges: PointCharge[];
  params: ElectricFieldReactiveParams;
};
