// (mouse_x, mouse_y): means a coordinate on the canvas (in pixels)
// (x, y): means a cartesian coordinate on the graph

interface ElectricFieldParams {
  zoom: number;
}

interface MouseCoord {
  mouse_x: number;
  mouse_y: number;
}

interface ElectricFieldProps {
  isDragging: boolean;
  lastMouseCoords: { mouse_x: number; mouse_y: number };
  viewport: { x: number; y: number };
  zoom: number;
};