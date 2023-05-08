import { redraw } from "../logic";
import { screenCoordToGraphPoint } from "../utils";

export function doubleClickHandler (e: React.MouseEvent<HTMLCanvasElement>, canvas: HTMLCanvasElement | null, graph: ElectricFieldProps) {
  const ctx = canvas?.getContext("2d");
  if (!ctx) return;
  if (e.detail !== 2) return;

  graph.pointCharges.push({
    ...screenCoordToGraphPoint(graph, { mouse_x: e.clientX, mouse_y: e.clientY }),
    charge: 1,
    velocity: { x: 0, y: 0 },
  });

  redraw(ctx, graph);
};
