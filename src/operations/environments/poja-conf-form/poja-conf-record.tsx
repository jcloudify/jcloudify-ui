import {PojaConfComponent} from ".";
import {pojaConfComponentV3_6_2} from "./v3_6_2";

export const PojaConfRecord = {
  "3.6.2": pojaConfComponentV3_6_2,
} as const;

export const getPojaConfComponent = (
  ver: keyof typeof PojaConfRecord
): PojaConfComponent | null => {
  return PojaConfRecord[ver];
};
