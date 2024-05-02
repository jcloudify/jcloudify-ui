export interface BaseOptional {
  isPresent: () => boolean;
}

export interface OptionalFn<T extends (...args: any[]) => any>
  extends BaseOptional {
  call: T;
}

export interface OptionalVal<T> extends BaseOptional {
  get: () => Required<T>;
}

export type Optional<T> = T extends (...args: any[]) => any
  ? OptionalFn<T>
  : OptionalVal<T>;

/**
 * TODO: test
 */
export const optional = <T>(val: T | undefined | null): Optional<T> => {
  // "!=" to tell not null or undefined
  const isPresent = () => val != null;

  const call = (...args: any[]) => {
    if (typeof val === "function") {
      val(...args);
    }
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
  } as unknown as Optional<T>;
};
