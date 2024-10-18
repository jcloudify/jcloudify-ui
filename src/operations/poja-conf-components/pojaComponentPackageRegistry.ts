import {PojaComponentPackage} from "@/operations/poja-conf-components";
import {pojaConfComponentV3_6_2} from "@/operations/poja-conf-components/v3_6_2";

const PojaComponentPackageRegistry: Record<string, PojaComponentPackage> = {
  "3.6.2": pojaConfComponentV3_6_2,
} as const;

export const getPojaComponentPackage = (version: string) => {
  return PojaComponentPackageRegistry[version];
};
