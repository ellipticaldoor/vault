import { prop, sort, first, last } from 'remeda';
import { AtlasSize } from 'client/screens/Atlas/helpers';

export type Coordinate = { x: number; y: number };
export type Position = { x: number; y: number };

const minMaxDistance = (points: number[]) => {
  if (points.length === 0) {
    return 0;
  }
  const sortedPoints = sort(points, (a, b) => a - b);
  const fisrtPoint = first(sortedPoints);
  const lastPoint = last(sortedPoints);

  return lastPoint - fisrtPoint;
};

export const getAtlasRuleMeasure = (coordinates: Coordinate[]) => {
  return {
    ruleX: minMaxDistance(coordinates.map(prop('x'))),
    ruleY: minMaxDistance(coordinates.map(prop('y'))),
  };
};

// const getCoordinatePosition = (
//   atlasSize: AtlasSize,
//   coordinate: Coordinate,
// ): Position => {};

// const drawVault = (ctx: CanvasRenderingContext2D, position: Position) => {};

// const drawRules = (ctx: CanvasRenderingContext2D, atlasSize: AtlasSize) => {};

// TODO: click or hover on vault and display modal

export const drawAtlas = (
  ctx: CanvasRenderingContext2D,
  atlasSize: AtlasSize,
  points: Coordinate[],
) => {
  ctx.fillStyle = 'rgb(200, 0, 0)';
  ctx.fillRect(10, 10, 50, 50);

  ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
  ctx.fillRect(30, 30, 50, 50);
};
