import {
  setArray,
  addTo,
  findOne,
  filterBy,
  rejectBy,
  swapWhen,
  updateBy,
  paginate,
  query,
} from '~/server/state';

type TestObject = {
  id: string;
  name: string;
  pet?: string;
  number?: number;
};

describe('setArray', () => {
  test('Assigns a new value to an array without loosing its reference', () => {
    const array = [{ id: '1' }, { id: '2' }, { id: '3' }];

    setArray(array, [{ id: '4' }]);

    expect(array).toEqual([{ id: '4' }]);
  });
});

describe('addTo', () => {
  test('returns a copy of an array that contains a new value', () => {
    const arrayToUpdate = ['a', 'b'];

    addTo(arrayToUpdate, 'c');

    expect(arrayToUpdate).toEqual(['a', 'b', 'c']);
  });
});

describe('find', () => {
  test('finds an object in an array of the same type', () => {
    const first = { id: 'first', name: 'name-a' };
    const second = { id: 'second', name: 'name-b', pet: 'dog' };
    const third = { id: 'third', name: 'name-b' };

    const array: TestObject[] = [first, second, third];

    expect(findOne(array, {})).toEqual(first);
    expect(findOne(array, { id: 'first' })).toEqual(first);
    expect(findOne(array, { id: 'second' })).toEqual(second);
    expect(findOne(array, { name: 'name-b' })).toEqual(second);
    expect(findOne(array, { pet: 'dog' })).toEqual(second);
    expect(findOne(array, { pet: 'cat' })).toEqual(undefined);
    expect(findOne(array, { id: 'third', name: 'name-b' })).toEqual(third);
  });
});

describe('filter', () => {
  test('filters objects from array that matches the search criteria', () => {
    const first = { id: 'first', name: 'name-a' };
    const second = { id: 'second', name: 'name-b', pet: 'dog' };
    const third = { id: 'third', name: 'name-b' };

    const array: TestObject[] = [first, second, third];

    expect(filterBy(array, {})).toEqual(array);
    expect(filterBy(array, { id: 'first' })).toEqual([first]);
    expect(filterBy(array, { id: 'second' })).toEqual([second]);
    expect(filterBy(array, { name: 'name-b' })).toEqual([second, third]);
    expect(filterBy(array, { pet: 'dog' })).toEqual([second]);
    expect(filterBy(array, { pet: 'cat' })).toEqual([]);
    expect(filterBy(array, { id: 'third', name: 'name-b' })).toEqual([third]);
  });
});

describe('rejectBy', () => {
  test('filters out objects from array that matches the search criteria', () => {
    const first = { id: 'first', name: 'name-a' };
    const second = { id: 'second', name: 'name-b', pet: 'dog' };
    const third = { id: 'third', name: 'name-b' };

    const array: TestObject[] = [first, second, third];

    expect(rejectBy(array, {})).toEqual([]);
    expect(rejectBy(array, { id: 'first' })).toEqual([second, third]);
    expect(rejectBy(array, { id: 'second' })).toEqual([first, third]);
    expect(rejectBy(array, { name: 'name-b' })).toEqual([first]);
    expect(rejectBy(array, { pet: 'dog' })).toEqual([first, third]);
    expect(rejectBy(array, { pet: 'cat' })).toEqual(array);
    expect(
      rejectBy(array, {
        id: 'third',
        name: 'name-b',
      }),
    ).toEqual([first, second]);
  });
});

describe('swapWhen', () => {
  test('returns newValue if the value of the provided key is the same in both objects', () => {
    const oldValue = { id: 1, name: 'name' };
    const newVale = { id: 1, name: 'new name' };

    const swapped = swapWhen('name', oldValue)(newVale);

    expect(swapped).toEqual({ id: 1, name: 'new name' });
  });

  test('returns oldValue if the value of the provided key is not the same in both objects', () => {
    const oldValue = { id: 1, name: 'name' };
    const newVale = { id: 1, name: 'new name' };

    const notSwapped = swapWhen('id', oldValue)(newVale);

    expect(notSwapped).toEqual({ id: 1, name: 'name' });
  });
});

describe('updateBy', () => {
  test('replaces an object in an array with with a new one when the value of the key is the same on both objects', () => {
    const arrayToUpdate = [
      { id: 1, name: 'foo' },
      { id: 2, name: 'bar' },
      { id: 3, name: 'baz' },
    ];

    const newValue = { id: 2, name: 'bar-bar' };

    updateBy('id', arrayToUpdate, newValue);

    expect(arrayToUpdate).toEqual([
      { id: 1, name: 'foo' },
      { id: 2, name: 'bar-bar' },
      { id: 3, name: 'baz' },
    ]);
  });
});

test('paginate', () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  expect(paginate(array, {})).toEqual([]);

  expect(paginate(array, { from: -100 })).toEqual([]);

  expect(paginate(array, { amount: 3 })).toEqual([1, 2, 3]);

  expect(paginate(array, { amount: 100 })).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  expect(paginate(array, { amount: 3, from: 1 })).toEqual([2, 3, 4]);

  expect(paginate(array, { amount: 3, from: array.length + 1 })).toEqual([]);

  expect(paginate(array, { amount: 3, from: array.length + 100 })).toEqual([]);
});

test('query', () => {
  const first = { id: 'first', name: 'name-a', number: 33 };
  const second = { id: 'second', name: 'name-b', pet: 'dog', number: 44 };
  const third = { id: 'third', name: 'name-b', pet: 'cat', number: 22 };

  const array: TestObject[] = [first, second, third];

  expect(query(array, {})).toEqual({
    data: array,
    total: array.length,
  });

  expect(
    query(array, {
      where: { name: 'name-b' },
    }),
  ).toEqual({
    data: [second, third],
    total: array.length,
  });

  expect(
    query(array, {
      orderBy: 'number',
    }),
  ).toEqual({
    data: [third, first, second],
    total: array.length,
  });

  expect(
    query(array, {
      orderBy: 'pet',
    }),
  ).toEqual({
    data: [third, second],
    total: array.length,
  });

  expect(
    query(array, {
      where: { name: 'name-b' },
      orderBy: 'number',
    }),
  ).toEqual({
    data: [third, second],
    total: array.length,
  });

  expect(
    query(array, {
      paginate: { amount: 1, from: 1 },
    }),
  ).toEqual({
    data: [second],
    total: array.length,
  });

  expect(
    query(array, {
      orderBy: 'number',
      paginate: { amount: 2, from: 0 },
    }),
  ).toEqual({
    data: [third, first],
    total: array.length,
  });

  expect(
    query(array, {
      where: { pet: 'dog' },
      orderBy: 'pet',
      paginate: { amount: 10, from: 0 },
    }),
  ).toEqual({
    data: [second],
    total: array.length,
  });

  expect(
    query(array, {
      where: { name: 'name-b' },
      orderBy: 'number',
      paginate: { amount: 10, from: 0 },
    }),
  ).toEqual({
    data: [third, second],
    total: array.length,
  });
});
