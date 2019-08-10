import { prop, sort, first, last } from 'remeda';
import { AtlasSize } from 'client/screens/Atlas/helpers';
import { colors } from 'client/styles';
import { CanvasContext, drawLine } from 'client/helpers';
import { Vault } from 'api/graphql';

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

const atlasBorder = (
  ctx: CanvasContext,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
) => {
  ctx.strokeStyle = colors.primary;
  ctx.beginPath();
  ctx.rect(fromX, fromY, toX, toY);
  ctx.stroke();
};

const ATLAS_PADDING = 25;
const CONTOUR_GAP = 100;

const drawContourLines = (
  ctx: CanvasContext,
  width: number,
  height: number,
) => {
  ctx.strokeStyle = colors.primary;

  const horizontalLineAmount = Math.floor(height / CONTOUR_GAP);
  const remainingHorizontalSpace =
    height - CONTOUR_GAP * (horizontalLineAmount - 1);
  const horizontalAlign = remainingHorizontalSpace / 2;

  for (let i = 0; i < horizontalLineAmount; i++) {
    const horizontalMove = i * CONTOUR_GAP + horizontalAlign;
    drawLine(ctx, 0, horizontalMove, width, horizontalMove);
  }

  const verticalLineAmount = Math.floor(width / CONTOUR_GAP);
  const remainingVerticalSpace = width - CONTOUR_GAP * (verticalLineAmount - 1);
  const verticalAlign = remainingVerticalSpace / 2;

  for (let i = 0; i < verticalLineAmount; i++) {
    const verticalMove = i * CONTOUR_GAP + verticalAlign;
    drawLine(ctx, verticalMove, 0, verticalMove, height);
  }
};

const VAULT_RADIUS = 15;

const drawVault = (ctx: CanvasContext, x: number, y: number, id: string) => {
  ctx.beginPath();
  ctx.arc(x, y, VAULT_RADIUS, 0, 2 * Math.PI);
  ctx.stroke();
};

const getRelativePoint = (distance: number, bound: Bound, point: number) => {
  const pointDistance = point - bound.minPoint;
  if (pointDistance === 0) return 0;

  const relativeDistance = bound.distance / pointDistance;
  return distance / relativeDistance;
};

export const getRelativeCoordinate = (
  width: number,
  height: number,
  bounds: { x: Bound; y: Bound },
  coordinate: Coordinate,
) => {
  const x = getRelativePoint(width, bounds.x, coordinate.x);
  const y = getRelativePoint(height, bounds.y, coordinate.y);
  return { x, y };
};

export const drawAtlas = (
  ctx: CanvasContext,
  atlasSize: AtlasSize,
  vaults: Vault[],
) => {
  ctx.translate(ATLAS_PADDING, ATLAS_PADDING);
  const width = atlasSize.width - ATLAS_PADDING * 2;
  const height = atlasSize.height - ATLAS_PADDING * 2;

  atlasBorder(ctx, 0, 0, width, height);
  drawContourLines(ctx, width, height);

  // const atlasBounds = getBounds(vaults);

  // vaults.forEach((vault) => {
  //   const { x, y } = getRelativeCoordinate(width, height, atlasBounds, vault);
  //   return drawVault(ctx, x, y, vault.id);
  // });
};
