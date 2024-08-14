import {
  DatabaseConf1WithDatabaseEnum,
  OneOfPojaConf,
  PojaConf1,
} from "@jcloudify-api/typescript-client";
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
  console.log("mapper.pojaConf", pojaConf);
  return {
    ...pojaConf,
    general: normalizeGeneralConf(pojaConf),
    gen_api_client: normalizeGenApiClientConf(pojaConf),
    database: normalizeDBConf(pojaConf),
    version: pojaConf.version!,
  };
};

const normalizeGeneralConf = ({general}: PojaConfFormDataV1) => {
  const {
    custom_java_deps = [],
    custom_java_repositories = [],
    custom_java_env_vars = {},
  } = general!;
  return {
    ...general!,
    custom_java_env_vars: Array.isArray(custom_java_env_vars)
      ? toRecord(custom_java_env_vars)
      : custom_java_env_vars,
    custom_java_deps: fromStringValue(custom_java_deps),
    custom_java_repositories: fromStringValue(custom_java_repositories),
  };
};

const normalizeDBConf = ({database}: PojaConfFormDataV1) => {
  switch (database?.with_database!) {
    case DatabaseConf1WithDatabaseEnum.NONE:
      return {
        ...database,
        database_non_root_username: undefined,
        database_non_root_password: undefined,
        prod_db_cluster_timeout: undefined,
        aurora_min_capacity: undefined,
        aurora_max_capacity: undefined,
        aurora_scale_point: undefined,
        aurora_sleep: undefined,
        aurora_auto_pause: false,
      };
    case DatabaseConf1WithDatabaseEnum.SQLITE:
      return {
        ...database,
        aurora_min_capacity: undefined,
        aurora_max_capacity: undefined,
        aurora_scale_point: undefined,
        aurora_sleep: undefined,
        aurora_auto_pause: false,
      };
    default:
      return database;
  }
};

const normalizeGenApiClientConf = ({
  __flags,
  gen_api_client,
}: PojaConfFormDataV1) => {
  if (!__flags?.with_gen_clients) return undefined;
  const {
    codeartifact_domain_name,
    codeartifact_repository_name,
    aws_account_id,
    ...rest
  } = gen_api_client!;

  const publishConfig = gen_api_client?.with_publish_to_npm_registry
    ? {
        codeartifact_domain_name,
        codeartifact_repository_name,
        aws_account_id,
      }
    : {
        codeartifact_repository_name: undefined,
        codeartifact_domain_name: undefined,
        aws_account_id: undefined,
      };

  return {
    ...rest,
    ...publishConfig,
  };
};
