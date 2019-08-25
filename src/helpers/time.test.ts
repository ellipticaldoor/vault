import { ticksToTime, millisecondsToReadableTime } from '~/helpers';

test('millisecondsToReadableTime', () => {
  expect(millisecondsToReadableTime(100000000)).toEqual('27h 46m 40s');

  expect(millisecondsToReadableTime(100000)).toEqual('01m 39s');

  expect(millisecondsToReadableTime(10000)).toEqual('10s');

  expect(millisecondsToReadableTime(2000)).toEqual('02s');

  expect(millisecondsToReadableTime(1)).toEqual('00s');

  expect(millisecondsToReadableTime(0)).toEqual('00s');
});

test('ticksToTime', () => {
  expect(ticksToTime(1)).toEqual('01s');
});
