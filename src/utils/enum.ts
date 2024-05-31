import {NonEmptyArray} from "@/types/util";

export const getEnumValues = <E extends {}>(enums: E) => {
  return Object.values(enums) as NonEmptyArray<E[keyof E]>;
};
