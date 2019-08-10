export type CanvasContext = CanvasRenderingContext2D;

export const scaleCanvas = (
  canvas: HTMLCanvasElement,
  ctx: CanvasContext,
  { width, height }: { width: number; height: number },
) => {
  // TODO: check previous atlasSize to see if it's necessary to resize

  const ratio = window.devicePixelRatio || 1;

  canvas.width = width * ratio;
  canvas.height = height * ratio;

  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  ctx.scale(ratio, ratio);
};

export const drawLine = (
  ctx: CanvasContext,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
) => {
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();
};
