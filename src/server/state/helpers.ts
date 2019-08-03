import { mapKeys, sortBy } from 'remeda';

export const setArray = <T>(arrayToSet: T[], valuesToSet: T[]): T[] => {
  arrayToSet.length = 0;
  arrayToSet.push(...valuesToSet);
  return arrayToSet;
};

export const setArrayState = <T>(array: T[]) => {
  return (valuesToSet: T[]): T[] => {
    return setArray(array, valuesToSet);
  };
};

export const addTo = <K>(arrayToUpdate: K[], newValue: K): K[] => {
  arrayToUpdate.push(newValue);
  return arrayToUpdate;
};

export const addToArrayState = <T>(arrayToUpdate: T[]) => {
  return (newValue: T): T => {
    addTo(arrayToUpdate, newValue);
    return newValue;
  };
};

const matchObjectBy = (args: {}, reject = false) => {
  return (object: {}) => {
    let objectWasFound = !reject;

    mapKeys(args, (key, value) => {
      if (object[key] !== value) {
        objectWasFound = reject;
      }
    });

    return objectWasFound;
  };
};

export const findOne = <T>(
  arrayToFilter: T[],
  args: Partial<T>,
): T | undefined => {
  return arrayToFilter.find(matchObjectBy(args));
};

export const findOneState = <T>(arrayToFilter: T[], errorMessage: string) => {
  return (args: Partial<T>): T => {
    const object = findOne(arrayToFilter, args);

    if (!object) {
      throw new Error(errorMessage);
    }

    return object;
  };
};

export const filterBy = <T>(arrayToFilter: T[], args: Partial<T>): T[] => {
  return arrayToFilter.filter(matchObjectBy(args));
};

export const rejectBy = <T>(arrayToFilter: T[], args: Partial<T>): T[] => {
  return arrayToFilter.filter(matchObjectBy(args, true));
};

export const swapWhen = <K extends object>(key: keyof K, newValue: K) => (
  oldValue: K,
): K => {
  return oldValue[key] !== newValue[key] ? oldValue : newValue;
};

export const updateBy = <K extends object>(
  key: keyof K,
  arrayToUpdate: K[],
  newValue: K,
): K[] => {
  const index = arrayToUpdate.findIndex((value) => {
    return value[key] === newValue[key];
  });

  arrayToUpdate[index] = newValue;

  return arrayToUpdate;
};

type PaginateArgs = {
  amount?: number;
  from?: number;
};

export const paginate = <K>(
  array: K[],
  { amount = 0, from = 0 }: PaginateArgs,
) => {
  from = from >= 0 ? from : 0;

  return array.slice(from, amount + from);
};

type QueryArgs<K> = {
  where?: Partial<K>;
  orderBy?: keyof K;
  paginate?: PaginateArgs;
};

type QueryReturn<K> = {
  data: K[];
  total: number;
};

export const query = <K extends {}>(
  arrayToQuery: K[],
  args: QueryArgs<K>,
): QueryReturn<K> => {
  const { where, orderBy, paginate: paginateArg } = args;
  let result = [...arrayToQuery];

  if (where) {
    result = filterBy(result, where);
  }

  if (orderBy) {
    result = sortBy(
      result.filter((item) => item.hasOwnProperty(orderBy)),
      (item) => item[orderBy],
    );
  }

  if (paginateArg) {
    result = paginate(result, paginateArg);
  }

  return {
    data: result,
    total: arrayToQuery.length,
  };
};

export const queryState = <K>(arrayToQuery: K[]) => {
  return (args: QueryArgs<K>) => {
    return query(arrayToQuery, args);
  };
};
