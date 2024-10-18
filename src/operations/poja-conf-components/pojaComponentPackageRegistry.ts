import {PojaConfComponentPackage} from "@/operations/poja-conf-components";
import {pojaConfComponentV3_6_2} from "@/operations/poja-conf-components/v3_6_2";

const PojaConfComponentPackageRegistry: Record<
  string,
  PojaConfComponentPackage
> = {
  "3.6.2": pojaConfComponentV3_6_2,
} as const;

export const getPojaConfComponentPackage = (version: string) => {
  return PojaConfComponentPackageRegistry[version];
};
