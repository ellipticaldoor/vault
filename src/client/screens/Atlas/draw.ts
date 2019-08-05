import { prop, sort, first, last } from 'remeda';
import { AtlasSize } from 'client/screens/Atlas/helpers';
import { colors } from 'client/styles';

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

const CONTOUR_INTERSECTION_DISTANCE = 100;

const drawContourLines = (
  ctx: CanvasRenderingContext2D,
  atlasSize: AtlasSize,
) => {
  ctx.strokeStyle = colors.primary;

  const horizontalLineAmount = Math.floor(
    atlasSize.height / CONTOUR_INTERSECTION_DISTANCE,
  );
  const remainginHorizontalSpace =
    atlasSize.height - CONTOUR_INTERSECTION_DISTANCE * horizontalLineAmount;
  const horizontalAlignCenter =
    CONTOUR_INTERSECTION_DISTANCE / 2 - remainginHorizontalSpace / 2;

  for (let i = 0; i < horizontalLineAmount + 2; i++) {
    const distance = CONTOUR_INTERSECTION_DISTANCE * i - horizontalAlignCenter;

    ctx.moveTo(0, distance);
    ctx.lineTo(atlasSize.width, distance);
    ctx.stroke();
  }

  const verticalLineAmount = Math.floor(
    atlasSize.width / CONTOUR_INTERSECTION_DISTANCE,
  );
  const remainginVerticalSpace =
    atlasSize.width - CONTOUR_INTERSECTION_DISTANCE * verticalLineAmount;
  const verticalAlignCenter =
    CONTOUR_INTERSECTION_DISTANCE / 2 - remainginVerticalSpace / 2;

  for (let i = 0; i < verticalLineAmount + 2; i++) {
    const distance = CONTOUR_INTERSECTION_DISTANCE * i - verticalAlignCenter;
    ctx.moveTo(distance, 0);
    ctx.lineTo(distance, atlasSize.height);
    ctx.stroke();
  }
};

// TODO: click or hover on vault and display modal

export const drawAtlas = (
  ctx: CanvasRenderingContext2D,
  atlasSize: AtlasSize,
  coordinates: Coordinate[],
) => {
  drawContourLines(ctx, atlasSize);
};
