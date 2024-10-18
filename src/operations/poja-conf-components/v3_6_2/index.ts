import {PojaComponentPackage} from "@/operations/poja-conf-components";
import {PojaConfEditV3_6_2, PojaConfFFV3_6_2} from "./PojaConfFormV3_6_2";
import {PojaConfViewV3_6_2} from "./PojaConfViewV3_6_2";
import {transformFormValuesV3_6_2} from "./mapperV3_6_2";
import {POJA_CONF_V3_6_2_DEFAULT_VALUES} from "./constant";

export const pojaConfComponentV3_6_2: PojaComponentPackage = {
  version: "3.6.2",
  ff: PojaConfFFV3_6_2,
  edit: PojaConfEditV3_6_2,
  view: PojaConfViewV3_6_2,
  formDefaultValues: POJA_CONF_V3_6_2_DEFAULT_VALUES,
  formTransformFormValues: transformFormValuesV3_6_2,
};
