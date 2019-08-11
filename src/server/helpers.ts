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

type LogColor = 'red' | 'green' | 'blue' | 'cyan';

export const log = (message: string, color?: LogColor) => {
  const selectedColor = color ? chalk[color] : undefined;

  // eslint-disable-next-line no-console
  console.info(makeTimestampMessage(message, selectedColor));
};

export const logError = (error: any): void =>
  // eslint-disable-next-line no-console
  console.error(
    makeTimestampMessage(
      `${(error.originalError && error.originalError.stack) || error.stack}`,
      chalk.redBright,
    ),
  );
