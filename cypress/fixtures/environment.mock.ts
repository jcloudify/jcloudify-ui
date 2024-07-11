import {ToRecord} from "@/providers";
import {
  Environment,
  EnvironmentType,
  EnvironmentStateEnum,
  Plan,
} from "@jcloudify-api/typescript-client";

// app1 envs
export const prod_env: ToRecord<Environment> = {
  id: "prod_env",
  environment_type: EnvironmentType.PROD,
  state: EnvironmentStateEnum.HEALTHY,
  archived: false,
  conf: {
    ses_source: "noreply@nowhere.com",
    with_swagger_ui: false,
    package_full_name: "poja.school.hei",
    custom: {
      custom_java_repositories: "string" as any,
      custom_java_deps: "string" as any,
      custom_java_env_vars: "string" as any,
    },
    java_facade_it: "FacadeIT",
    with_gen_clients: false,
    with_database: "aurora-postgres",
    jacoco_min_coverage: 0.8,
    with_publish_to_npm_registry: false,
    client: {
      ts_client_default_openapi_server_url: "https://jcloudify.com/api",
      ts_client_api_url_env_var_name: "API_CLIENT_BASE_URL",
    },
    compute: {
      frontal_memory: 2048,
      worker_memory: 1024,
      worker_batch: 5,
    },
    with_snapstart: false,
    database: {
      database_non_root_username: "string",
      database_non_root_password: "string",
      prod_db_cluster_timeout: 300,
    },
    with_sentry: true,
    with_sonar: true,
    with_codeql: false,
    concurrency: {
      frontal_reserved_concurrent_executions_nb: "3",
      worker_reserved_concurrent_executions_nb: "40",
    },
    aurora: {
      aurora_min_capacity: 0,
      aurora_max_capacity: 0,
      aurora_scale_point: 0,
      aurora_sleep: 300,
      aurora_auto_pause: false,
    },
  },
  plan: {} as Plan,
};

export const preprod_env: ToRecord<Environment> = {
  id: "preprod_env",
  environment_type: EnvironmentType.PREPROD,
  state: EnvironmentStateEnum.HEALTHY,
  archived: false,
  conf: {
    ses_source: "noreply@nowhere.com",
    with_swagger_ui: false,
    package_full_name: "api.jcloudify.app",
    custom: {
      custom_java_repositories: "string" as any,
      custom_java_deps: "string" as any,
      custom_java_env_vars: "string" as any,
    },
    java_facade_it: "FacadeIT",
    with_gen_clients: false,
    with_database: "sqlite",
    jacoco_min_coverage: 0.8,
    with_publish_to_npm_registry: false,
    client: {
      ts_client_default_openapi_server_url: "string",
      ts_client_api_url_env_var_name: "string",
    },
    compute: {
      frontal_memory: 2048,
      worker_memory: 1024,
      worker_batch: 5,
    },
    with_snapstart: false,
    database: {
      database_non_root_username: "string",
      database_non_root_password: "string",
      prod_db_cluster_timeout: 300,
    },
    with_sentry: false,
    with_sonar: false,
    with_codeql: false,
    concurrency: {
      frontal_reserved_concurrent_executions_nb: "string",
      worker_reserved_concurrent_executions_nb: "string",
    },
    aurora: {
      aurora_min_capacity: 0,
      aurora_max_capacity: 0,
      aurora_scale_point: 0,
      aurora_sleep: 300,
      aurora_auto_pause: false,
    },
  },
  plan: {} as Plan,
};

export const preprod_env2: ToRecord<Environment> = {
  id: "preprod_env2",
  environment_type: EnvironmentType.PREPROD,
  state: EnvironmentStateEnum.UNHEALTHY,
  archived: false,
  conf: {
    ses_source: "noreply@nowhere.com",
    with_swagger_ui: false,
    package_full_name: "school.hei",
    custom: {
      custom_java_repositories: "string" as any,
      custom_java_deps: "string" as any,
      custom_java_env_vars: "string" as any,
    },
    java_facade_it: "FacadeIT",
    with_gen_clients: false,
    with_database: "sqlite",
    jacoco_min_coverage: 0.8,
    with_publish_to_npm_registry: false,
    client: {
      ts_client_default_openapi_server_url: "string",
      ts_client_api_url_env_var_name: "string",
    },
    compute: {
      frontal_memory: 2048,
      worker_memory: 1024,
      worker_batch: 5,
    },
    with_snapstart: false,
    database: {
      database_non_root_username: "string",
      database_non_root_password: "string",
      prod_db_cluster_timeout: 300,
    },
    with_sentry: false,
    with_sonar: false,
    with_codeql: false,
    concurrency: {
      frontal_reserved_concurrent_executions_nb: "string",
      worker_reserved_concurrent_executions_nb: "string",
    },
    aurora: {
      aurora_min_capacity: 0,
      aurora_max_capacity: 0,
      aurora_scale_point: 0,
      aurora_sleep: 300,
      aurora_auto_pause: false,
    },
  },
  plan: {} as Plan,
};

export const envs = [prod_env, preprod_env, preprod_env2];
