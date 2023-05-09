import { Vector, electricFieldAtPoint } from "./physics";
import { graphPointToScreenCoord, screenCoordToGraphPoint } from "./utils";

export function drawBackground(ctx: CanvasRenderingContext2D, _graph: ElectricFieldGraph) {
  const { width, height } = ctx.canvas;
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);
}

export function drawGrid(ctx: CanvasRenderingContext2D, _graph: ElectricFieldGraph) {
  const { width, height } = ctx.canvas;
  ctx.strokeStyle = '#555555';
  ctx.lineWidth = 1;

  ctx.beginPath();
  for (let x = 0; x < width; x += 15 * _graph.zoom) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }
  for (let y = 0; y < height; y += 15 * _graph.zoom) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }
  ctx.stroke();
}

export function drawAxis(ctx: CanvasRenderingContext2D, graph: ElectricFieldGraph) {
  const { width, height } = ctx.canvas;
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = '#ffffff';
  ctx.fillStyle = '#aaaaaa';
  ctx.font = '20px monospace';

  // Get the view rect
  const view_width = width / graph.zoom;
  const view_height = height / graph.zoom;

  // ctx.fillText(`vport:(${graph.viewport.x}, ${graph.viewport.y})`, 10, 25);
  // ctx.fillText(`view: (${view_width}, ${view_height})`, 10, 50);
  // ctx.fillText(`canv: (${width}, ${height})`, 10, 75);
  // ctx.fillText(`zoom: ${graph.zoom}`, 10, 100);

  const screen_x = graph.view.x * graph.zoom;
  const screen_y = graph.view.y * graph.zoom;
  const viewport_x = graph.view.x;
  const viewport_y = graph.view.y;

  ctx.beginPath();
  // Does the graph contain the Y axis?
  if (viewport_x < 0 && 0 < viewport_x + view_width) {
    // draw the Y axis
    ctx.moveTo(0 - screen_x, 0);
    ctx.lineTo(0 - screen_x, height);
    ctx.fillText(`${viewport_y}`, 5 - screen_x, 25);
    ctx.fillText(`${viewport_y + view_height}`, 5 - screen_x, height - 20);
  }
  // Does the graph contain the X axis?
  // if (y < 0 && 0 < y + view_height) {
  if (viewport_y - view_height < 0 && 0 < viewport_y) {
    // draw the X axis
    ctx.moveTo(0, 0 + screen_y);
    ctx.lineTo(width, 0 + screen_y);
    ctx.fillText(`${viewport_x}`, 5, screen_y + 20);
    ctx.fillText(`${viewport_x + view_width}`, width - 80, screen_y + 20);
  }
  // Show the limits of the x and y axis
  ctx.stroke();
}
const CHARGE_RADII = 9;

export function drawPointCharge(ctx: CanvasRenderingContext2D, graph: ElectricFieldGraph, pointCharge: PointCharge) {
  const { x, y, charge: q } = pointCharge;

  const { screen_x: mouse_x, screen_y: mouse_y } = graphPointToScreenCoord(graph, { x, y });

  // Draw the point charge
  ctx.beginPath();
  ctx.arc(mouse_x, mouse_y, CHARGE_RADII, 0, 2 * Math.PI);
  ctx.fillStyle = q > 0 ? '#f24444' : '#555bab';
  ctx.strokeStyle = q > 0 ? '#ff0000' : '#0000ff';
  ctx.fill();
  ctx.stroke();
}

function drawLine(ctx: CanvasRenderingContext2D, _graph: ElectricFieldGraph, from: Vector | Point, to: Vector | Point) {
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
}

function drawElectricField(ctx: CanvasRenderingContext2D, graph: ElectricFieldGraph) {
  const arrowsHorizontal = 10;
  const arrowsVertical   = 10;
  const { width, height } = ctx.canvas;

  for (let i = 0; i < arrowsHorizontal; i++) {
    for (let j = 0; j < arrowsVertical; j++) {

      // Mapeamos este doble for a puntos en la pantalla (50 x 50)
      const screen_x = (i / arrowsHorizontal) * width + (width / arrowsHorizontal / 2);
      const screen_y = (j / arrowsVertical) * height + (height / arrowsVertical / 2);

      const point = screenCoordToGraphPoint(graph, { screen_x, screen_y });

      // Calculamos el campo eléctrico en ese punto
      const E = electricFieldAtPoint(graph, point);

      // Calculamos la posición del punto en la pantalla
      const E_screen = graphPointToScreenCoord(graph, E);

      // Dibujamos el vector
      drawLine(
        ctx, graph, { x: screen_x, y: screen_y }, { x: E_screen.screen_x, y: E_screen.screen_y }
      );

      ctx.beginPath();
      ctx.arc(screen_x, screen_y, 10, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }
}

export function redraw(ctx: CanvasRenderingContext2D, graph: ElectricFieldGraph) {
  const { width, height } = ctx.canvas;
  ctx.clearRect(0, 0, width, height);

  drawBackground(ctx, graph);
  if (graph.params.showGrid) {
    drawGrid(ctx, graph);
  }
  drawAxis(ctx, graph);

  graph.pointCharges.forEach((pointCharge) => {
    drawPointCharge(ctx, graph, pointCharge);
  });

  drawElectricField(ctx, graph);
}
