import { redraw } from "../logic";
import { screenCoordToGraphPoint } from "../utils";

const RIGHT_CLICK_DELAY = 500;
const RIGHT_CLICK_DELAY_AFTER_DOUBLE_CLICK = 1000;

export function rightClickHandler(e: React.MouseEvent<HTMLCanvasElement>, canvas: HTMLCanvasElement | null, graph: ElectricFieldProps, lastRightClick: React.MutableRefObject<number>) {
  const ctx = canvas?.getContext("2d");
  if (!ctx) return;

  e.preventDefault();

  const now = Date.now();
  if (now - lastRightClick.current > RIGHT_CLICK_DELAY) {
    lastRightClick.current = now;
    return;
  }

  graph.pointCharges.push({
    ...screenCoordToGraphPoint(graph, { mouse_x: e.clientX, mouse_y: e.clientY }),
    q: -1,
  });

  redraw(ctx, graph);
  lastRightClick.current = now - RIGHT_CLICK_DELAY_AFTER_DOUBLE_CLICK;
}
