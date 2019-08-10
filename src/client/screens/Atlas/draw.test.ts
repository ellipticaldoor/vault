import { getBounds } from 'client/screens/Atlas/draw';

test('getBounds', () => {
  expect(
    getBounds([
      { x: 0, y: 0 },
      { x: 10, y: 10 },
      { x: -10, y: -10 },
      { x: 0, y: 10 },
      { x: 10, y: 0 },
      { x: 0, y: -10 },
      { x: -10, y: 0 },
    ]),
  ).toEqual({
    x: { minPoint: -10, maxPoint: 10, distance: 20 },
    y: { minPoint: -10, maxPoint: 10, distance: 20 },
  });

  expect(getBounds([])).toEqual({
    x: { minPoint: 0, maxPoint: 0, distance: 0 },
    y: { minPoint: 0, maxPoint: 0, distance: 0 },
  });

  expect(getBounds([{ x: -3, y: 6 }, { x: 7, y: -8 }])).toEqual({
    x: { minPoint: -3, maxPoint: 7, distance: 10 },
    y: { minPoint: -8, maxPoint: 6, distance: 14 },
  });
});
