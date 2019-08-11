import chalk from 'chalk';
import uuidv1 from 'uuid/v1';

export const createId = () => uuidv1();

export const randomPercentage = () => {
  return Math.random() * 101;
};

export const getCurrentTimestamp = (): string =>
  new Date()
    .toISOString()
    .replace('T', ' ')
    .substr(0, 19);

export const makeTimestampMessage = (
  message: string,
  color?: (text: string) => string,
): string => {
  const timestampMessage = `[${getCurrentTimestamp()}] ${message}`;
  return color ? color(timestampMessage) : timestampMessage;
};

export const log = (message: string, color?: (text: string) => string) => {
  // eslint-disable-next-line no-console
  console.info(makeTimestampMessage(message, color));
};

export const logError = (error: any): void =>
  // eslint-disable-next-line no-console
  console.error(
    makeTimestampMessage(
      `${(error.originalError && error.originalError.stack) || error.stack}`,
      chalk.redBright,
    ),
  );
