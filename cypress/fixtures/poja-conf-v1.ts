import {
  DatabaseConf1WithDatabaseEnum,
  WithQueuesNbEnum,
} from "@jcloudify-api/typescript-client";

const baseConf = {
  version: "string",
  general: {
    app_name: "mock-app",
    with_snapstart: true,
    with_queues_nb: WithQueuesNbEnum.NUMBER_2,
    package_full_name: "com.jcloudify.app",
  },
  integration: {
    with_sentry: false,
    with_sonar: false,
    with_codeql: false,
    with_file_storage: false,
    with_swagger_ui: false,
  },
  concurrency: {
    frontal_reserved_concurrent_executions_nb: 0,
    worker_reserved_concurrent_executions_nb: 0,
  },
  compute: {
    frontal_memory: 2048,
    frontal_function_timeout: 30,
    worker_memory: 1024,
    worker_batch: 5,
    worker_function_1_timeout: 600,
    worker_function_2_timeout: 600,
  },
  emailing: {
    ses_source: "noreply@nowhere.com",
  },
  testing: {
    java_facade_it: "FacadeIT",
    jacoco_min_coverage: 0.8,
  },
  database: {
    with_database: DatabaseConf1WithDatabaseEnum.NONE,
    database_non_root_username: null,
    database_non_root_password: null,
    prod_db_cluster_timeout: null,
    aurora_min_capacity: null,
    aurora_max_capacity: null,
    aurora_scale_point: null,
    aurora_sleep: null,
    aurora_auto_pause: false,
  },
};

export const with_gen_api_client_enabled = {
  ...baseConf,
  gen_api_client: {
    aws_account_id: null,
    codeartifact_repository_name: null,
    codeartifact_domain_name: null,
    with_publish_to_npm_registry: false,
    ts_client_default_openapi_server_url: `http://mock.com/api/v1`,
    ts_client_api_url_env_var_name: "API_BASE_URL",
  },
};

export const with_gen_api_client_disabled = {
  ...baseConf,
  gen_api_client: null,
};

export const with_publish_to_npm_registry = {
  ...baseConf,
  gen_api_client: {
    aws_account_id: 1234567,
    with_publish_to_npm_registry: true,
    ts_client_default_openapi_server_url: "http://mock.com/api/v1",
    ts_client_api_url_env_var_name: "API_BASE_URL",
    codeartifact_repository_name: `mock-store`,
    codeartifact_domain_name: `npm-mock-app`,
  },
};

export const with_database_none = {
  with_database: DatabaseConf1WithDatabaseEnum.NONE,
  ...baseConf,
};

export const with_database_non_poja_managed = {
  with_database: DatabaseConf1WithDatabaseEnum.NON_POJA_MANAGED_POSTGRES,
  ...baseConf,
};

export const with_database_sqlite = {
  ...baseConf,
  database: {
    ...baseConf.database,
    with_database: DatabaseConf1WithDatabaseEnum.SQLITE,
    prod_db_cluster_timeout: 300,
  },
};

export const with_database_aurora_postgres = {
  ...baseConf,
  database: {
    ...baseConf.database,
    with_database: DatabaseConf1WithDatabaseEnum.AURORA_POSTGRES,
    database_non_root_username: "dummy",
    database_non_root_password: "dummy",
    prod_db_cluster_timeout: 300,
    aurora_min_capacity: 2,
    aurora_max_capacity: 16,
    aurora_scale_point: 60,
    aurora_sleep: 900,
    aurora_auto_pause: false,
  },
};

export const custom_java_env_vars = {
  CLIENT_ID: "clientId",
  SECRET_KEY: "secretKey",
};

export const custom_java_deps = ["lombok", "tika", "guava"];
export const custom_java_repositories = ["mavenLocal", "gradleLocal"];
