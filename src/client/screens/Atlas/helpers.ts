import { NAV_WIDTH, STATE_PANEL_WIDTH } from 'client/components';

export type AtlasSize = {
  width: number;
  height: number;
};

export const getAtlasSize = () => ({
  width: window.innerWidth - NAV_WIDTH - STATE_PANEL_WIDTH,
  height: window.innerHeight,
});

export const scaleAtlas = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  { width, height }: AtlasSize,
) => {
  // TODO: check previous atlasSize to see if it's necessary to resize

  const ratio = window.devicePixelRatio || 1;

  canvas.width = width * ratio;
  canvas.height = height * ratio;

  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  ctx.scale(ratio, ratio);
};
