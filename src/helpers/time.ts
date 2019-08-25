import { gameConfig } from '~/game-config';

export const millisecondsToReadableTime = (milliseconds: number) => {
  if (milliseconds < 0) return '--s';

  const hours = milliseconds / (1000 * 60 * 60);
  const absoluteHours = Math.floor(hours);
  const h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

  const minutes = (hours - absoluteHours) * 60;
  const absoluteMinutes = Math.floor(minutes);
  const m = absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes;

  const seconds = (minutes - absoluteMinutes) * 60;
  const absoluteSeconds = Math.floor(seconds);
  const s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;

  if (h === '00' && m === '00') return `${s}s`;
  if (h === '00') return `${m}m ${s}s`;
  return `${h}h ${m}m ${s}s`;
};

export const ticksToTime = (ticks: number) => {
  return millisecondsToReadableTime(ticks * gameConfig.refreshRate);
};
