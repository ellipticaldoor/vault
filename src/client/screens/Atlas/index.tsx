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

export const Atlas: React.FC = () => {
  const [points] = useState<Point[]>(initialPoints);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current === null) return;

    const context = canvasRef.current.getContext('2d');

    if (context === null) return;

    const ratio = 1;
    const canvasWidth = window.innerWidth * ratio;
    context.canvas.width = canvasWidth - NAV_WIDTH - STATE_PANEL_WIDTH;
    context.canvas.height = window.innerHeight * ratio;
    context.scale(ratio, ratio);

    context.fillStyle = 'rgb(200, 0, 0)';
    context.fillRect(10, 10, 50, 50);

    context.fillStyle = 'rgba(0, 0, 200, 0.5)';
    context.fillRect(30, 30, 50, 50);
  }, []);

  return <Canvas ref={canvasRef} />;
};

const Canvas = styled.canvas`
  background: ${colors.base};
  width: 100%;
  height: 100vh;
`;
