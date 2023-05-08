// (mouse_x, mouse_y): means a coordinate on the canvas (in pixels)
// (x, y): means a cartesian coordinate on the graph

interface ElectricFieldParams {
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
  q: number;
}

interface ElectricFieldProps {
  isDragging: boolean;
  lastMouseCoords: { mouse_x: number; mouse_y: number };
  viewport: { x: number; y: number };
  zoom: number;
  pointCharges: PointCharge[];
};
