import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import { colors } from 'client/styles';
import styled from 'styled-components';
import { scaleAtlas, getAtlasSize } from 'client/screens/Atlas/helpers';
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
  const atlasSize = useMemo(() => getAtlasSize(), []);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    setCtx(canvasRef.current.getContext('2d'));
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !ctx) return;
    scaleAtlas(canvasRef.current, ctx, atlasSize);
    drawAtlas(ctx, points);
  }, [ctx, atlasSize, points]);

  return <Canvas ref={canvasRef} />;
};

const Canvas = styled.canvas`
  background: ${colors.base};
  width: 100%;
  height: 100vh;
`;
