import {
  Application,
  DatabaseConf1WithDatabaseEnum,
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
} from ".";

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
  pojaConf: PojaConfFormDataV1,
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
  {general}: PojaConfFormDataV1,
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

const normalizeDBConf = ({database}: PojaConfFormDataV1) => {
  switch (database?.with_database!) {
    case DatabaseConf1WithDatabaseEnum.NONE:
      return {
        ...database,
        database_non_root_username: null,
        database_non_root_password: null,
        prod_db_cluster_timeout: null,
        ...NO_AURORA_CONF,
      };
    case DatabaseConf1WithDatabaseEnum.SQLITE:
      return {
        ...database,
        database_non_root_username: null,
        database_non_root_password: null,
        ...NO_AURORA_CONF,
      };
    default:
      return database;
  }
};

const normalizeGenApiClientConf = ({
  __flags,
  gen_api_client,
}: PojaConfFormDataV1) => {
  if (!__flags?.with_gen_clients) return null;
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
