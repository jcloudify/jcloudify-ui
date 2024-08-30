import {PojaConfRecord} from "@/operations/environments/poja-conf-form/poja-conf-record";
import {Application, OneOfPojaConf} from "@jcloudify-api/typescript-client";

export type PojaConfViewComponent = React.ComponentType<{
  envId: string;
  appId: string;
}>;
export type PojaConfFFComponent = React.ComponentType<{}>;
export type PojaConfEditComponent = React.ComponentType<{
  envId: string;
  appId: string;
  onSuccess: () => void;
}>;

export type PojaConfFacadeCmp<C extends React.ComponentType<any>> =
  C extends React.ComponentType<infer P>
    ? React.ComponentType<P & {version: PojaConfComponent["version"]}>
    : never;

/**
 * every public version of poja has a unique form fields associated w them thus we need to make 3 cmps for each of them that are:
 * ff: RA form fields that can be used with both <Create> & <Edit />
 * view: displaying a given a config
 * edit: minimalistic edit cmp for pojaConf
 */
export interface PojaConfComponent {
  version: keyof typeof PojaConfRecord;
  ff: PojaConfFFComponent;
  view: PojaConfViewComponent;
  edit: PojaConfEditComponent;
  defaultValues?: OneOfPojaConf;
  /**
   * any values obtained from this version form can be normalized with this fn
   */
  transformFormValues: (conf: any, app: Application) => OneOfPojaConf;
}
