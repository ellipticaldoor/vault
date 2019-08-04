import { NAV_WIDTH, STATE_PANEL_WIDTH } from 'client/components';

export const getAtlasSize = () => ({
  width: window.innerWidth - NAV_WIDTH - STATE_PANEL_WIDTH,
  height: window.innerHeight,
});

export const scaleAtlas = (canvas: HTMLCanvasElement) => {
  const { width, height } = getAtlasSize();

  const ratio = window.devicePixelRatio || 1;

  canvas.width = width * ratio;
  canvas.height = height * ratio;

  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.scale(ratio, ratio);
};
