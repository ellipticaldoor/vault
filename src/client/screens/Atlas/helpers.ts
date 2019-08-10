import { prop, sort, first, last } from 'remeda';
import { AtlasSize } from './drawAtlas';

export type Coordinate = { x: number; y: number };
export type Position = { x: number; y: number };
export type Bound = { minPoint: number; maxPoint: number; distance: number };

const pointBounds = (points: number[]): Bound => {
  if (points.length === 0) {
    return { minPoint: 0, maxPoint: 0, distance: 0 };
  }
  const sortedPoints = sort(points, (a, b) => a - b);
  const minPoint = first(sortedPoints);
  const maxPoint = last(sortedPoints);
  const distance = maxPoint - minPoint;

  return { minPoint, maxPoint, distance };
};

export const getBounds = (coordinates: Coordinate[]) => ({
  x: pointBounds(coordinates.map(prop('x'))),
  y: pointBounds(coordinates.map(prop('y'))),
});

const getRelativePoint = (distance: number, bound: Bound, point: number) => {
  const pointDistance = point - bound.minPoint;
  if (pointDistance === 0) return 0;

  const relativeDistance = bound.distance / pointDistance;
  return distance / relativeDistance;
};

export const getRelativeCoordinate = (
  { paddedWidth, paddedHeight }: AtlasSize,
  bounds: { x: Bound; y: Bound },
  coordinate: Coordinate,
) => {
  const x = getRelativePoint(paddedWidth, bounds.x, coordinate.x);
  const y = getRelativePoint(paddedHeight, bounds.y, coordinate.y);
  return { x, y };
};
