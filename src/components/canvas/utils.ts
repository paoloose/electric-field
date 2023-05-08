export function drawBackground(ctx: CanvasRenderingContext2D, graph: ElectricFieldProps) {
  const { width, height } = ctx.canvas;
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);
}

export function drawGrid(ctx: CanvasRenderingContext2D, graph: ElectricFieldProps) {
  const { width, height } = ctx.canvas;
  ctx.strokeStyle = '#555555';
  ctx.lineWidth = 1;

  ctx.beginPath();
  for (let x = 0; x < width; x += 10) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }
  for (let y = 0; y < height; y += 10) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }
  ctx.stroke();
}

export function drawAxis(ctx: CanvasRenderingContext2D, graph: ElectricFieldProps) {
  const { width, height } = ctx.canvas;
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = '#aaaaaa';
  ctx.fillStyle = '#aaaaaa';
  ctx.font = '14px monospace';

  // Get the view rect
  const view_width = ctx.canvas.width / graph.zoom;
  const view_height = ctx.canvas.height / graph.zoom;

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
    ctx.fillText(`${viewport_y}`, 5 - screen_x, 15);
    ctx.fillText(`${viewport_y + view_height}`, 5 - screen_x, height - 10);
  }
  // Does the graph contain the X axis?
  // if (y < 0 && 0 < y + view_height) {
  if (viewport_y - view_height < 0 && 0 < viewport_y) {
    // draw the X axis
    ctx.moveTo(0, 0 + screen_y);
    ctx.lineTo(width, 0 + screen_y);
    ctx.fillText(`${viewport_x}`, 5, screen_y + 20);
    ctx.fillText(`${viewport_x + view_width}`, width - 50, screen_y + 20);
  }
  // Show the limits of the x and y axis
  ctx.stroke();
}

export function redraw(ctx: CanvasRenderingContext2D, graph: ElectricFieldProps) {
  const { width, height } = ctx.canvas;
  ctx.clearRect(0, 0, width, height);

  drawBackground(ctx, graph);
  drawGrid(ctx, graph);
  drawAxis(ctx, graph);
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
