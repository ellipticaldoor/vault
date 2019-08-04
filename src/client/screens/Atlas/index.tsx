import React, { useState, useEffect, useRef } from 'react';
import { colors } from 'client/styles';
import styled from 'styled-components';
import { scaleAtlas } from 'client/screens/Atlas/helpers';
import { Point, drawAtlas } from 'client/screens/Atlas/draw';

const initialPoints = [
  { x: 0, y: 0 },
  { x: 10, y: 10 },
  { x: -10, y: -10 },
  { x: 0, y: 10 },
  { x: 10, y: 0 },
  { x: 0, y: -10 },
  { x: -10, y: 0 },
];

export const Atlas: React.FC = () => {
  const [points] = useState<Point[]>(initialPoints);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current === null) return;

    const ctx = canvasRef.current.getContext('2d');
    if (ctx === null) return;

    scaleAtlas(canvasRef.current);

    drawAtlas(ctx);
  }, []);

  return <Canvas ref={canvasRef} />;
};

const Canvas = styled.canvas`
  background: ${colors.base};
  width: 100%;
  height: 100vh;
`;
