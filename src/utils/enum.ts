import {NonEmptyArray} from "@/types/util";

/**
 * **Pure** function to get all variants from an enum/obj
 */
export const getEnumValues = <E extends {}>(enums: E) => {
  return Object.values(enums) as NonEmptyArray<E[keyof E]>;
};
