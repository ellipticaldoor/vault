import { getBounds, getRelativeCoordinate } from 'client/screens/Atlas';

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

test('getRelativeCoordinate', () => {
  const width = 300;
  const height = 600;
  const atlasSize = { paddedWidth: width, paddedHeight: height };
  const coordinates = [
    { x: 0, y: 0 },
    { x: 10, y: 10 },
    { x: -10, y: -10 },
    { x: 10, y: -10 },
    { x: -10, y: 10 },
  ];
  const bounds = getBounds(coordinates);

  expect(getRelativeCoordinate(atlasSize, bounds, coordinates[0])).toEqual({
    x: width / 2,
    y: height / 2,
  });

  expect(getRelativeCoordinate(atlasSize, bounds, coordinates[1])).toEqual({
    x: width,
    y: height,
  });

  expect(getRelativeCoordinate(atlasSize, bounds, coordinates[2])).toEqual({
    x: 0,
    y: 0,
  });

  expect(getRelativeCoordinate(atlasSize, bounds, coordinates[3])).toEqual({
    x: width,
    y: 0,
  });

  expect(getRelativeCoordinate(atlasSize, bounds, coordinates[4])).toEqual({
    x: 0,
    y: height,
  });
});
