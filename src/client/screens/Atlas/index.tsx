import React, { useState, useEffect, useRef } from 'react';
import { ScreenContainer } from 'client/components';
import { colors } from 'client/styles';

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

const canvasAtlasId = 'atlas';

export const Atlas: React.FC = () => {
  const [points] = useState<Point[]>(initialPoints);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current === null) return;

    const ctx = canvasRef.current.getContext('2d');

    if (ctx === null) return;

    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 50, 50);

    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);
  }, []);

  return (
    <ScreenContainer>
      <canvas
        ref={canvasRef}
        id={canvasAtlasId}
        width="800px"
        height="500px"
        style={{ background: colors.base }}
      />
    </ScreenContainer>
  );
};
