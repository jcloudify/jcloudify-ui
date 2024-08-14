import {Dict} from "@/providers";

export const reverseObjectKeyValues = (obj: Dict<string>) => {
  return Object.keys(obj).reduce<Dict<string>>((o, key) => {
    const value = obj[key];
    o[value] = key;
    return o;
  }, {});
};

export const omit = <T extends object, K extends keyof T>(
  o: T,
  keys: K[]
): Omit<T, K> => {
  return Object.fromEntries(
    Object.keys(o)
      .filter((key) => !keys.includes(key as K))
      .map((key) => [key, o[key as K]])
  ) as any;
};

export const removeNestedUndefined = (o: object) => {
  return JSON.parse(JSON.stringify(o));
}
