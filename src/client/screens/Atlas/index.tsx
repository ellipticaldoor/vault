import React, { useState, useEffect, useRef } from 'react';
import { NAV_WIDTH, STATE_PANEL_WIDTH } from 'client/components';
import { colors } from 'client/styles';
import styled from 'styled-components';

const initialPoints = [
  { x: 0, y: 0 },
  { x: 10, y: 10 },
  { x: -10, y: -10 },
  { x: 0, y: 10 },
  { x: 10, y: 0 },
  { x: 0, y: -10 },
  { x: -10, y: 0 },
];

type Point = { x: number; y: number };

const scaleCanvas = (
  canvas: HTMLCanvasElement,
  context: any,
  width: number,
  height: number,
) => {
  // Assume the device pixel ratio is 1 if the browser doesn't specify it
  const ratio = window.devicePixelRatio || 1;

  // Set the 'real' canvas size to the higher width/height
  canvas.width = width * ratio;
  canvas.height = height * ratio;

  // Then scale it back down with CSS
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  // Scale the drawing context so everything will work at the higher ratio
  context.scale(ratio, ratio);
};

export const Atlas: React.FC = () => {
  const [points] = useState<Point[]>(initialPoints);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current === null) return;

    const ctx = canvasRef.current.getContext('2d');

    if (ctx === null) return;

    console.log(canvasRef.current.width);
    console.log(canvasRef.current.height);

    const canvasWidth = window.innerWidth - NAV_WIDTH - STATE_PANEL_WIDTH;
    const canvasHeight = window.innerHeight;

    console.log(canvasWidth);
    console.log(canvasHeight);

    scaleCanvas(canvasRef.current, ctx, canvasWidth, canvasHeight);

    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 50, 50);

    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);
  });

  return <Canvas ref={canvasRef} />;
};

const Canvas = styled.canvas`
  background: ${colors.base};
  width: 100%;
  height: 100vh;
`;
