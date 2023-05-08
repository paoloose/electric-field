import { Vector, electricFieldAtPoint } from "./physics";
import { graphPointToScreenCoord } from "./utils";

export function drawBackground(ctx: CanvasRenderingContext2D, _graph: ElectricFieldProps) {
  const { width, height } = ctx.canvas;
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);
}

export function drawGrid(ctx: CanvasRenderingContext2D, _graph: ElectricFieldProps) {
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

export function drawAxis(ctx: CanvasRenderingContext2D, graph: ElectricFieldProps) {
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

  const screen_x = graph.viewport.x * graph.zoom;
  const screen_y = graph.viewport.y * graph.zoom;
  const viewport_x = graph.viewport.x;
  const viewport_y = graph.viewport.y;

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
const RADII = 9;

export function drawPointCharge(ctx: CanvasRenderingContext2D, graph: ElectricFieldProps, pointCharge: PointCharge) {
  const { x, y, charge: q } = pointCharge;

  const { mouse_x, mouse_y } = graphPointToScreenCoord(graph, { x, y });

  // Draw the point charge
  ctx.beginPath();
  ctx.arc(mouse_x, mouse_y, RADII, 0, 2 * Math.PI);
  ctx.fillStyle = q > 0 ? '#f24444' : '#555bab';
  ctx.strokeStyle = q > 0 ? '#ff0000' : '#0000ff';
  ctx.fill();
  ctx.stroke();
}

function getForceOnPointCharge(graph: ElectricFieldProps, pointCharge: PointCharge) {
  const { x, y } = pointCharge;
  // console.log("pointCharge:", pointCharge)
  const { x: E_x, y: E_y } = electricFieldAtPoint(graph, { x, y });

  return { x: E_x * pointCharge.charge, y: E_y * pointCharge.charge };
}

function applyForceOnPointCharge(pointCharge: PointCharge, force: Vector, dt: number) {
  const { x, y, charge } = pointCharge;
  const { x: F_x, y: F_y } = force;

  console.log({ force })

  const new_x = x + ((F_x * dt) / charge);
  const new_y = y + ((F_y * dt) / charge);

  console.log({ new_x, new_y })

  return { ...pointCharge, x: new_x, y: new_y };
}

export function animationFrameForces(graph: ElectricFieldProps, dt: number) {
  const { pointCharges } = graph;

  if (pointCharges.length === 1) return;

  // Calculate the forces on each point charge
  const forces = pointCharges.map(pointCharge => getForceOnPointCharge(graph, pointCharge));

  // Apply the forces to each point charge
  const newPointCharges = pointCharges.map((pointCharge, i) => applyForceOnPointCharge(pointCharge, forces[i], dt));

  // Update the graph
  graph.pointCharges = newPointCharges;
}

function drawLine(ctx: CanvasRenderingContext2D, graph: ElectricFieldProps, from: Vector, to: Vector) {
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
}

function drawElectricField(ctx: CanvasRenderingContext2D, graph: ElectricFieldProps) {
  const arrowsHorizontal = 50;
  const arrowsVertical   = 50;
  const { width, height } = ctx.canvas;

  for (let i = -arrowsHorizontal; i < arrowsHorizontal; i++) {
    for (let j = -arrowsVertical; j < arrowsVertical; j++) {

      // Mapeamos este doble for a puntos en la pantalla (50 x 50)
      const x = (i / arrowsHorizontal) * (width / graph.zoom)
      const y = (j / arrowsVertical) * (height / graph.zoom)

      // Calculamos el campo eléctrico en ese punto
      const { x: E_x, y: E_y } = electricFieldAtPoint(graph, { x, y });

      // Calculamos la posición del punto en la pantalla
      const { mouse_x, mouse_y } = graphPointToScreenCoord(graph, { x, y });
      const { mouse_x: E_mouse_x, mouse_y: E_mouse_y } = graphPointToScreenCoord(graph, { x: x + E_x, y: y + E_y });

      // Dibujamos el vector
      ctx.strokeStyle = '#00ff00';
      drawLine(ctx, graph, { x: mouse_x, y: mouse_y }, { x: E_mouse_x, y: E_mouse_y });
    }
  }
}

export function redraw(ctx: CanvasRenderingContext2D, graph: ElectricFieldProps) {
  const { width, height } = ctx.canvas;
  ctx.clearRect(0, 0, width, height);

  drawBackground(ctx, graph);
  // drawGrid(ctx, graph);
  drawAxis(ctx, graph);

  graph.pointCharges.forEach((pointCharge) => {
    drawPointCharge(ctx, graph, pointCharge);
  });

  drawElectricField(ctx, graph);
}

export function getMouseCoords(event: React.PointerEvent<HTMLCanvasElement> | PointerEvent | WheelEvent, canvas: HTMLCanvasElement): MouseCoord {
  const rect = canvas.getBoundingClientRect();
  return {
    mouse_x: event.clientX - rect.left,
    mouse_y: event.clientY - rect.top,
  };
}

export function getCanvasContext(canvas: HTMLCanvasElement | null): CanvasRenderingContext2D | null {
  if (!canvas) return null;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  return ctx;
}
