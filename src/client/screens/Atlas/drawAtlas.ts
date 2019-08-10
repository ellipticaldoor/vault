import { NAV_WIDTH, STATE_PANEL_WIDTH } from '~/client/components';
import { colors } from '~/client/styles';
import { CanvasContext } from '~/client/helpers';

export type AtlasSize = {
  width: number;
  height: number;
  paddedWidth: number;
  paddedHeight: number;
};

const ATLAS_PADDING = 25;

export const getAtlasSize = (): AtlasSize => {
  const width = window.innerWidth - NAV_WIDTH - STATE_PANEL_WIDTH;
  const height = window.innerHeight;
  const padding = ATLAS_PADDING * 2;

  return {
    width,
    height,
    paddedWidth: width - padding,
    paddedHeight: height - padding,
  };
};

const atlasBorder = (
  ctx: CanvasContext,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
) => {
  ctx.rect(fromX, fromY, toX, toY);
};

export const drawLine = (
  ctx: CanvasContext,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
) => {
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
};

const CONTOUR_GAP = 100;

const drawContourLines = (
  ctx: CanvasContext,
  width: number,
  height: number,
) => {
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

export const drawAtlas = (
  ctx: CanvasContext,
  { paddedWidth, paddedHeight }: AtlasSize,
) => {
  ctx.translate(ATLAS_PADDING, ATLAS_PADDING);
  ctx.strokeStyle = colors.primary;
  ctx.beginPath();

  atlasBorder(ctx, 0, 0, paddedWidth, paddedHeight);
  drawContourLines(ctx, paddedWidth, paddedHeight);

  ctx.stroke();
};
