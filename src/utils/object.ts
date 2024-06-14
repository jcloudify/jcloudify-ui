import {Dict} from "@/providers";

export const reverseObjectKeyValues = (obj: Dict<string>) => {
  return Object.keys(obj).reduce<Dict<string>>((o, key) => {
    const value = obj[key];
    o[value] = key;
    return o;
  }, {});
};
