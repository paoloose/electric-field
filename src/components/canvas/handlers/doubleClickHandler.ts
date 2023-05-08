import { redraw } from "../logic";
import { screenCoordToGraphPoint } from "../utils";

export function doubleClickHandler (e: React.MouseEvent<HTMLCanvasElement>, canvas: HTMLCanvasElement | null, graph: ElectricFieldProps) {
  const ctx = canvas?.getContext("2d");
  if (!ctx) return;
  if (e.detail !== 2) return;

  graph.pointCharges.push({
    ...screenCoordToGraphPoint(graph, { mouse_x: e.clientX, mouse_y: e.clientY }),
    q: 1,
  });

  redraw(ctx, graph);
};
