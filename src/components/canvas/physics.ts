export const COULOMB_CONSTANT = 8.9875517923e9;
export const ELECTRON_CHARGE = -1.602176634e-19;
// export const POINT_CHARGE_MASS = 9.1093837015e-31;
export const POINT_CHARGE_MASS = 1e-6;

export class Vector implements Vector {
  x: number;

  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  norm() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  unit() {
    const length = this.norm();
    if (length === 0) return new Vector(0, 0);
    return new Vector(this.x / length, this.y / length);
  }

  scaled(scalar: number) {
    return new Vector(this.x * scalar, this.y * scalar);
  }
}

function electricField(q: number, r: number) {
  if (r === 0) return 0;
  return (COULOMB_CONSTANT * q) / (r * r);
}

function sumAllVectors(vectors: Vector[]) {
  const sum = vectors.reduce((acc, vector) => ({
    x: acc.x + vector.x,
    y: acc.y + vector.y,
  }), { x: 0, y: 0 });

  return new Vector(sum.x, sum.y);
}

function electricFieldVector(pointCharge: PointCharge, point: Point) {
  const diff = new Vector(
    point.x - pointCharge.x,
    point.y - pointCharge.y,
  );

  const r = diff.norm();
  const unit = diff.unit();

  const E = electricField(pointCharge.charge, r);

  return new Vector(
    E * unit.x,
    E * unit.y,
  );
}

export function electricFieldAtPoint(graph: ElectricFieldGraph, point: Point): Vector {
  const { pointCharges } = graph;

  const electricFields = pointCharges.map((pointCharge) => (
    (pointCharge.x === point.x && pointCharge.y === point.y)
      ? new Vector(0, 0)
      : electricFieldVector(pointCharge, point)
  ));

  return sumAllVectors(electricFields);
}

function getForceOnPointCharge(graph: ElectricFieldGraph, pointCharge: PointCharge): Vector {
  const { x, y } = pointCharge;
  const { x: E_x, y: E_y } = electricFieldAtPoint(graph, { x, y });

  return new Vector(
    E_x * pointCharge.charge,
    E_y * pointCharge.charge,
  );
}

function applyForceOnPointCharge(pointCharge: PointCharge, force: Vector, dt: number) {
  const { x, y } = pointCharge;
  const { x: F_x, y: F_y } = force;

  const a_x = F_x / POINT_CHARGE_MASS;
  const a_y = F_y / POINT_CHARGE_MASS;

  const v_x = pointCharge.velocity.x + a_x * dt;
  const v_y = pointCharge.velocity.y + a_y * dt;

  return {
    ...pointCharge,
    x: x + v_x * dt,
    y: y + v_y * dt,
    vx: v_x,
    vy: v_y,
  };
}

export function applyForcesAnimation(graph: ElectricFieldGraph, dt: number) {
  const { pointCharges } = graph;

  if (pointCharges.length === 1) return;

  // Calculate the net force on each point charge
  const forces = pointCharges.map((pointCharge) => (
    getForceOnPointCharge(graph, pointCharge)
  ));

  console.log(forces);

  // Apply the force to each point charge
  const newPointCharges = pointCharges.map((pointCharge, i) => (
    applyForceOnPointCharge(pointCharge, forces[i], dt)
  ));

  // Update the graph
  graph.pointCharges = newPointCharges;
}
