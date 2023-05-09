// (mouse_x, mouse_y): means a coordinate on the canvas (in pixels)
// (x, y): means a cartesian coordinate on the graph

interface ElectricFieldReactiveProps {
  zoom: number;
}

interface Point {
  x: number;
  y: number;
}

interface MouseCoord {
  mouse_x: number;
  mouse_y: number;
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
  showGrid: boolean;
};
