import {VersionedPojaConfComponents} from "@/operations/environments/poja-conf-form";
import {pojaConfComponentV3_6_2} from "@/operations/environments/poja-conf-form/v3_6_2";

export const PojaConfRecord = {
  "3.6.2": pojaConfComponentV3_6_2,
} as const;

export const getPojaVersionedComponent = (
  version: keyof typeof PojaConfRecord
): VersionedPojaConfComponents => {
  return PojaConfRecord[version];
};
