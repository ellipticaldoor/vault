import { getAtlasRuleMeasure } from 'client/screens/Atlas/draw';

describe('getAtlasRuleMeasure', () => {
  test('returns proper rule measure', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 10, y: 10 },
      { x: -10, y: -10 },
      { x: 0, y: 10 },
      { x: 10, y: 0 },
      { x: 0, y: -10 },
      { x: -10, y: 0 },
    ];

    expect(getAtlasRuleMeasure(points)).toEqual({ ruleX: 20, ruleY: 20 });

    expect(getAtlasRuleMeasure([])).toEqual({ ruleX: 0, ruleY: 0 });
  });

  test('returns proper rule measure - 2', () => {
    const points = [
      { x: -8, y: 42 },
      { x: 4, y: 12 },
      { x: 10, y: 33 },
      { x: -3, y: 15 },
    ];

    expect(getAtlasRuleMeasure(points)).toEqual({ ruleX: 18, ruleY: 30 });
  });

  test('returns 0 if there are no points', () => {
    expect(getAtlasRuleMeasure([])).toEqual({ ruleX: 0, ruleY: 0 });
  });
});