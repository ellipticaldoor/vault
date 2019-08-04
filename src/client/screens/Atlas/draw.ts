export type Point = { x: number; y: number };

export const drawAtlas = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = 'rgb(200, 0, 0)';
  ctx.fillRect(10, 10, 50, 50);

  ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
  ctx.fillRect(30, 30, 50, 50);
};
