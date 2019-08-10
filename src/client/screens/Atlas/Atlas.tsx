import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { getBounds, getRelativeCoordinate } from 'client/screens/Atlas/helpers';
import { drawAtlas, getAtlasSize } from 'client/screens/Atlas/drawAtlas';
import { CanvasContext, scaleCanvas } from 'client/helpers';
import { Vault } from 'api/graphql';
import { createId } from 'server/helpers';
import { VaultButton } from './VaultButton';

const initialVaults = [
  { id: createId(), x: 0, y: 0 },
  { id: createId(), x: 10, y: 10 },
  { id: createId(), x: -10, y: -10 },
  { id: createId(), x: 10, y: -10 },
  { id: createId(), x: -10, y: 10 },
] as Vault[];

export const Atlas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const atlasSize = useMemo(() => getAtlasSize(), []);
  const [ctx, setCtx] = useState<CanvasContext | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    setCtx(canvasRef.current.getContext('2d'));
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !ctx) return;
    scaleCanvas(canvasRef.current, ctx, atlasSize);
    drawAtlas(ctx, atlasSize);
  }, [ctx, atlasSize]);

  const [vaults] = useState<Vault[]>(initialVaults);
  const atlasBounds = useMemo(() => getBounds(vaults), [vaults]);

  const VaultButtons = useMemo(() => {
    return vaults.map((vault, index) => {
      const { x, y } = getRelativeCoordinate(atlasSize, atlasBounds, vault);
      return <VaultButton key={`vault-button${index}`} x={x} y={y} />;
    });
  }, [vaults, atlasBounds, atlasSize]);

  return (
    <AtlasContainer>
      <Canvas ref={canvasRef} />
      {VaultButtons}
    </AtlasContainer>
  );
};

const AtlasContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

const Canvas = styled.canvas`
  position: absolute;
  width: 100%;
  height: 100%;
`;
