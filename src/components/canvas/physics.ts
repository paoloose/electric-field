const norm = (v: Point) => Math.sqrt(v.x * v.x + v.y * v.y);

export class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const unitVector = (v: Point): Vector => {
  const length = norm(v);
  return {
    x: v.x / length,
    y: v.y / length,
  };
};

const COULOMB_CONSTANT = 8.9875517923 * Math.pow(10, 9);

function electricForce(q1: number, q2: number, r: number) {
  return COULOMB_CONSTANT * (q1 * q2) / (r * r);
}

function electricField(q: number, r: number) {
  return COULOMB_CONSTANT * q / (r * r);
}

export function electricForceVector(charge1: PointCharge, charge2: PointCharge) {
  const diff: Vector = {
    x: (charge2.x - charge1.x),
    y: (charge2.y - charge1.y),
  };

  const unit = unitVector(diff);
  const distance = norm(diff);

  const force = electricForce(charge1.charge, charge2.charge, distance);

  return new Vector(unit.x * force, unit.y * force);
}

function sumAllVectors(vectors: Vector[]) {
  const totalVector = vectors.reduce((acc, vector) => {
    return {
      x: acc.x + vector.x,
      y: acc.y + vector.y,
    };
  }, { x: 0, y: 0 });

  const unit = unitVector(totalVector);
  const magnitude = norm(totalVector);

  return new Vector(unit.x * magnitude, unit.y * magnitude);
}

export function coulombTotalForce(p: PointCharge, pointCharges: PointCharge[]) {
  const forces = pointCharges.map((pointCharge) => {
    if (pointCharge === p) {
      return new Vector(0, 0);
    }
    return electricForceVector(p, pointCharge);
  });

  const totalForce = sumAllVectors(forces);

  const unit = unitVector(totalForce);
  const magnitude = norm(totalForce);

  return new Vector(unit.x * magnitude, unit.y * magnitude);
}

export function electricFieldVector(charge: PointCharge, point: Point) {
  const diff: Vector = {
    x: (point.x - charge.x),
    y: (point.y - charge.y),
  };

  const unit = unitVector(diff);
  const distance = norm(diff);

  const magnitude = electricField(charge.charge, distance);

  return new Vector(unit.x * magnitude, unit.y * magnitude);
}

export function electricFieldAtPoint(graph: ElectricFieldGraph, point: Point) {
  const { pointCharges } = graph;

  const electricFields: Vector[] = [];

  for (const pointCharge of pointCharges) {
    if (pointCharge.x === point.x && pointCharge.y === point.y) {
      continue;
    }
    const electricField = electricFieldVector(pointCharge, point);
    electricFields.push({
      x: electricField.x / 10000,
      y: electricField.y / 10000,
    })
    // electricFields.push(electricField);
  }

  const totalElectricField = sumAllVectors(electricFields);

  return totalElectricField;
}
