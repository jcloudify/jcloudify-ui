import {
  Application,
  DatabaseConf1WithDatabaseEnum,
  GenApiClient1,
  OneOfPojaConf,
  PojaConf1,
} from "@jcloudify-api/typescript-client";
import {StringValue, fromStringValue} from "@/components/batch-array-editor";
import {KeyValue, toRecord} from "@/components/batch-record-editor";
import {
  NO_AURORA_CONF,
  NO_PUBLISH_CLIENT_CONF,
  NO_MAILING_CONF,
  NO_CONCURRENCY_CONF,
} from "./constant";

export interface PojaConfFormDataV3_6_2 extends OneOfPojaConf {
  general?: OneOfPojaConf["general"] & {
    custom_java_deps: StringValue[];
    custom_java_repositories: StringValue[];
    custom_java_env_vars: KeyValue[] | Record<string, string>;
  };
  __flags?: {
    with_gen_clients?: boolean;
  };
}

// TODO: make facade for versioning
export const transformFormValuesV3_6_2 = (
  pojaConf: PojaConfFormDataV3_6_2,
  with_app: Application
): PojaConf1 => {
  const {__flags, ...normalizedConf} = {
    ...pojaConf,
    general: normalizeGeneralConf(pojaConf, with_app),
    gen_api_client: normalizeGenApiClientConf(pojaConf) as any,
    database: normalizeDBConf(pojaConf),
    version: pojaConf.version!,
    concurrency: pojaConf.concurrency || NO_CONCURRENCY_CONF,
    emailing: pojaConf.emailing || NO_MAILING_CONF,
  };
  return normalizedConf;
};

const normalizeGeneralConf = (
  {general}: PojaConfFormDataV3_6_2,
  with_app: Application
) => {
  const {
    custom_java_deps = [],
    custom_java_repositories = [],
    custom_java_env_vars = {},
  } = general!;
  return {
    ...general!,
    app_name: with_app.name,
    custom_java_env_vars: Array.isArray(custom_java_env_vars)
      ? toRecord(custom_java_env_vars)
      : custom_java_env_vars,
    custom_java_deps: fromStringValue(custom_java_deps),
    custom_java_repositories: fromStringValue(custom_java_repositories),
  };
};

const normalizeDBConf = ({database}: PojaConfFormDataV3_6_2) => {
  switch (database?.with_database!) {
    case DatabaseConf1WithDatabaseEnum.NONE:
    case DatabaseConf1WithDatabaseEnum.SQLITE:
    case DatabaseConf1WithDatabaseEnum.NON_POJA_MANAGED_POSTGRES:
      return {
        ...database,
        ...NO_AURORA_CONF,
      };
    default:
      return database;
  }
};

const normalizeGenApiClientConf = ({
  __flags,
  gen_api_client,
}: PojaConfFormDataV3_6_2): GenApiClient1 => {
  if (!__flags?.with_gen_clients)
    return {
      ...NO_PUBLISH_CLIENT_CONF,
      ts_client_api_url_env_var_name: null,
      ts_client_default_openapi_server_url: null,
    };
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
    : NO_PUBLISH_CLIENT_CONF;
  return {
    ...rest,
    ...publishConfig,
  };
};
