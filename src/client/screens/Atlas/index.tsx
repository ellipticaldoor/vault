import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { scaleAtlas, getAtlasSize } from 'client/screens/Atlas/helpers';
import { Coordinate, drawAtlas } from 'client/screens/Atlas/draw';

const initialCoordinates = [
  { x: 0, y: 0 },
  { x: 10, y: 10 },
  { x: -10, y: -10 },
  { x: 0, y: 10 },
  { x: 10, y: 0 },
  { x: 0, y: -10 },
  { x: -10, y: 0 },
];

export const Atlas: React.FC = () => {
  const [coordinates] = useState<Coordinate[]>(initialCoordinates);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const atlasSize = useMemo(() => getAtlasSize(), []);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    setCtx(canvasRef.current.getContext('2d'));
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !ctx) return;
    scaleAtlas(canvasRef.current, ctx, atlasSize);
    drawAtlas(ctx, atlasSize, initialCoordinates);
  }, [ctx, atlasSize, coordinates]);

  return <Canvas ref={canvasRef} />;
};

const Canvas = styled.canvas`
  width: 100%;
  height: 100vh;
`;
