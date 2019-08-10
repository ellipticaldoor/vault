export type CanvasContext = CanvasRenderingContext2D;

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
