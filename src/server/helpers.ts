import uuidv1 from 'uuid/v1';

export const createId = () => uuidv1();

export const randomPercentage = () => {
  return Math.random() * 101;
};
