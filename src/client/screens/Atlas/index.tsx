import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { scaleAtlas, getAtlasSize } from 'client/screens/Atlas/helpers';
import { drawAtlas } from 'client/screens/Atlas/draw';
import { CanvasContext } from 'client/helpers';
import { Vault } from 'api/graphql';

const initialVaults = [
  { x: 0, y: 0 },
  { x: 10, y: 10 },
  { x: -10, y: -10 },
  { x: 0, y: 10 },
  { x: 10, y: 0 },
  { x: 0, y: -10 },
  { x: -10, y: 0 },
] as Vault[];

export const Atlas: React.FC = () => {
  const [vaults] = useState<Vault[]>(initialVaults);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const atlasSize = useMemo(() => getAtlasSize(), []);
  const [ctx, setCtx] = useState<CanvasContext | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    setCtx(canvasRef.current.getContext('2d'));
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !ctx) return;
    scaleAtlas(canvasRef.current, ctx, atlasSize);
    drawAtlas(ctx, atlasSize, vaults);
  }, [ctx, atlasSize, vaults]);

  return <Canvas ref={canvasRef} />;
};

const Canvas = styled.canvas`
  width: 100%;
  height: 100vh;
`;
