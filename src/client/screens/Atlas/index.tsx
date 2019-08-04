import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as Pts from 'pts';
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [space, setSpace] = useState<Pts.CanvasSpace>();
  const [form, setForm] = useState<Pts.CanvasForm>();

  const [points] = useState<Point[]>(initialPoints);

  const animate = useCallback((): Pts.AnimateCallbackFn => {
    return () => {
      if (!space || !form) return;

      const subs = space.innerBound.map((p) =>
        Pts.Line.subpoints([p, space.pointer], 30),
      );
      const rects = Pts.Util.zip(subs).map((r, i) =>
        Pts.Rectangle.corners(r).rotate2D((i * Math.PI) / 60, space.pointer),
      );
      form.strokeOnly('#FDC', 2).polygons(rects);
    };
  }, [space, form]);

  useEffect(() => {
    if (canvasRef.current === null) return;

    const newSpace = new Pts.CanvasSpace(canvasRef.current);
    newSpace.setup({ bgcolor: colors.base, resize: false, retina: false });

    newSpace
      .bindMouse()
      .bindTouch()
      .play();

    setSpace(newSpace);
    setForm(newSpace.getForm());
  }, []);

  useEffect(() => {
    if (!space) return;
    space.add({ animate: animate() });
  }, [animate, space]);

  return (
    <ScreenContainer>
      <canvas ref={canvasRef} id={canvasAtlasId} width="800px" height="500px" />
    </ScreenContainer>
  );
};

// References:
//  https://github.com/williamngan/react-pts-canvas/blob/master/src/index.js
//  https://github.com/williamngan/pts/blob/master/src/_lib.ts#L32
//  https://github.com/williamngan/pts/blob/master/demo/pts.quickStart.js
