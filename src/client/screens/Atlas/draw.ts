import { prop, sort, first, last } from 'remeda';
import { AtlasSize } from 'client/screens/Atlas/helpers';
import { colors } from 'client/styles';
import { CanvasContext, drawLine } from 'client/helpers';
import { Vault } from 'api/graphql';

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

// const drawVault = (ctx: CanvasContext, position: Position) => {};

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

const drawVault = (ctx: CanvasContext, x: number, y: number) => {
  ctx.beginPath();
  ctx.arc(x, y, VAULT_RADIUS, 0, 2 * Math.PI);
  ctx.stroke();
};

// TODO: click or hover on vault and display modal

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
  vaults.forEach(({ x, y }) => drawVault(ctx, x, y));
};
