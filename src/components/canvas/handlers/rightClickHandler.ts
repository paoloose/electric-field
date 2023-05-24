import { ELECTRON_CHARGE, Vector } from '../physics';
import { screenCoordToGraphPoint } from '../utils';

const RIGHT_CLICK_DELAY = 500;
const RIGHT_CLICK_DELAY_AFTER_DOUBLE_CLICK = 1000;

export function rightClickHandler(
  e: React.MouseEvent<HTMLCanvasElement>,
  canvas: HTMLCanvasElement | null,
  graph: ElectricFieldGraph,
  lastRightClick: React.MutableRefObject<number>,
) {
  const ctx = canvas?.getContext('2d');
  if (!ctx) return;

  e.preventDefault();

  const now = Date.now();
  if (now - lastRightClick.current > RIGHT_CLICK_DELAY) {
    lastRightClick.current = now;
    return;
  }

  graph.pointCharges.push({
    ...screenCoordToGraphPoint(graph, { screen_x: e.clientX, screen_y: e.clientY }),
    charge: ELECTRON_CHARGE,
    velocity: new Vector(0, 0),
    acceleration: new Vector(0, 0),
  });

  lastRightClick.current = now - RIGHT_CLICK_DELAY_AFTER_DOUBLE_CLICK;
}
