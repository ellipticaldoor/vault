import { isRequired } from '~/validation';

test('isRequired', () => {
  expect(isRequired(true)).toEqual(true);

  expect(isRequired('hello')).toEqual(true);

  expect(isRequired(1)).toEqual(true);

  expect(isRequired(['a', 'b'])).toEqual(true);

  expect(isRequired(false)).toEqual(false);

  expect(isRequired('')).toEqual(false);

  expect(isRequired(undefined)).toEqual(false);
});
