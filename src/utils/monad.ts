export interface BaseOptional {
  isPresent: () => boolean;
}

export interface OptionalFn<T extends (...args: any[]) => any>
  extends BaseOptional {
  call: T;
}

export interface OptionalVal<T> extends BaseOptional {
  get: () => Required<T>;
  ifPresentThen: <R>(cb: (v: T) => R) => void;
}

export type Optional<T> = T extends (...args: any[]) => any
  ? OptionalFn<T>
  : OptionalVal<T>;

/**
 * Partial impl of Monad
 * TODO: test
 */
export const optional = <T>(val: T | undefined | null): Optional<T> => {
  // "!=" to tell not null or undefined
  const isPresent = () => val != null;

  const call = (...args: any[]) => {
    if (typeof val === "function") {
      return val(...args);
    }
  };

  const ifPresentThen = <R>(cb: (v: Required<T>) => R) => {
    if (isPresent()) return cb(val as Required<T>);
  };

  const get = () => {
    if (!isPresent()) {
      throw new Error("val not present");
    }
    return val;
  };

  return {
    get,
    call,
    isPresent,
    ifPresentThen,
  } as unknown as Optional<T>;
};
