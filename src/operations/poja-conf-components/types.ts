import {Application, OneOfPojaConf} from "@jcloudify-api/typescript-client";
import {UseUpdateOptions} from "react-admin";

export interface CommonPojaConfComponentProps {
  targetId: string;
  // possible type of resource on which the PojaConf configuration may apply to, ensuring clear context for the operation.
  targetResource: "environment" | "deployment";
  appId: string;
}

export type PojaConfViewComponent =
  React.ComponentType<CommonPojaConfComponentProps>;

export type PojaConfFFComponent = React.ComponentType;

export type PojaConfEditComponent = React.ComponentType<
  CommonPojaConfComponentProps & {
    // Only allow passing mutation events, omitting other options for a focused API
    mutationLifecycles?: Pick<
      UseUpdateOptions,
      "onSuccess" | "onSettled" | "onError"
    >;
  }
>;

/**
 * Each public version of Poja has its own unique set of form fields.
 * For each version, we create three components:
 *
 * - `ff`: Form fields used in both <Create> and <Edit> components, leveraging React Admin's form layout.
 * - `view`: Fields for displaying Poja configuration details.
 * - `edit`: Component used specifically for editing Poja configurations.
 */
export interface PojaComponentPackage {
  version: string;
  ff: PojaConfFFComponent;
  view: PojaConfViewComponent;

  /**
   * `edit` is used specifically for editing the Poja configuration.
   * Unlike `create`, which typically integrates configuration fields into the resource creation form,
   * `edit` operates independently to modify existing configurations.
   */
  edit: PojaConfEditComponent;

  formDefaultValues?: OneOfPojaConf;

  /**
   * A function to normalize the form values obtained from this version's form fields.
   */
  formTransformValues: (conf: any, app: Application) => OneOfPojaConf;
}

export type PojaConfComponent =
  | PojaConfFFComponent
  | PojaConfEditComponent
  | PojaConfViewComponent;
