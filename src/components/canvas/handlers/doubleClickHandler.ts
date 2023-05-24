import { Vector, ELECTRON_CHARGE } from '../physics';
import { screenCoordToGraphPoint } from '../utils';

export function doubleClickHandler(
  e: React.MouseEvent<HTMLCanvasElement>,
  canvas: HTMLCanvasElement | null,
  graph: ElectricFieldGraph,
) {
  const ctx = canvas?.getContext('2d');
  if (!ctx) return;
  if (e.detail !== 2) return;

  graph.pointCharges.push({
    ...screenCoordToGraphPoint(graph, { screen_x: e.clientX, screen_y: e.clientY }),
    charge: -ELECTRON_CHARGE,
    velocity: new Vector(0, 0),
    acceleration: new Vector(0, 0),
  });
}
