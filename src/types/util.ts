export type NonEmptyArray<E> = [E, ...E[]];

export type Nullable<T extends unknown> = T extends object
  ?
      | {
          [k in keyof T]?: T[k];
        }
      | undefined
  : T | undefined;
