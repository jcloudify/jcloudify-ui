import {OneOfPojaConf, PojaConf1} from "@jcloudify-api/typescript-client";
import {StringValue, fromStringValue} from "@/components/batch-array-editor";
import {KeyValue, toRecord} from "@/components/batch-record-editor";

export interface PojaConfFormDataV1 extends Omit<OneOfPojaConf, "version"> {
  general?: OneOfPojaConf["general"] & {
    custom_java_deps: StringValue[];
    custom_java_repositories: StringValue[];
    custom_java_env_vars: KeyValue[] | Record<string, string>;
  };
  __flags?: {
    with_gen_clients?: boolean;
  };
  version?: OneOfPojaConf["version"];
}

// TODO: make facade for versioning
export const fromPojaConfFormData = (
  pojaConf: PojaConfFormDataV1
): PojaConf1 => {
  const {
    custom_java_deps = [],
    custom_java_env_vars = [],
    custom_java_repositories = [],
  } = pojaConf.general!;
  return {
    ...pojaConf,
    general: {
      ...pojaConf.general,
      custom_java_env_vars: Array.isArray(custom_java_env_vars)
        ? toRecord(custom_java_env_vars)
        : custom_java_env_vars,
      custom_java_deps: fromStringValue(custom_java_deps),
      custom_java_repositories: fromStringValue(custom_java_repositories),
    },
    gen_api_client: pojaConf.__flags?.with_gen_clients
      ? pojaConf.gen_api_client
      : undefined,
    version: pojaConf.version!,
  };
};
