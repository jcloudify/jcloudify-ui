import {
  ComputeConf1,
  ConcurrencyConf1,
  DatabaseConf1WithDatabaseEnum,
  MailingConf1,
  PojaConf1,
  WithQueuesNbEnum,
} from "@jcloudify-api/typescript-client";

export const NO_PUBLISH_CLIENT_CONF = {
  with_publish_to_npm_registry: false,
  aws_account_id: null,
  codeartifact_repository_name: null,
  codeartifact_domain_name: null,
};

export const NO_AURORA_CONF = {
  aurora_min_capacity: null,
  aurora_max_capacity: null,
  aurora_scale_point: null,
  aurora_sleep: null,
  aurora_auto_pause: false,
  database_non_root_username: null,
  database_non_root_password: null,
  prod_db_cluster_timeout: null,
};

export const NO_MAILING_CONF = {
  ses_source: null,
};

export const MAILING_CONF: MailingConf1 = {
  ses_source: null,
};

export const NO_CONCURRENCY_CONF: ConcurrencyConf1 = {
  frontal_reserved_concurrent_executions_nb: null,
  worker_reserved_concurrent_executions_nb: null,
};

export const QUEUE0_COMPUTE_WORKER_CONF: ComputeConf1 = {
  worker_memory: 0,
  worker_function_1_timeout: 0,
  worker_function_2_timeout: 0,
  worker_batch: 0,
};

export const QUEUE1_COMPUTE_WORKER_CONF: ComputeConf1 = {
  worker_function_2_timeout: 0,
};

export const POJA_CONF_V3_6_2_DEFAULT_VALUES: PojaConf1 = {
  version: "3.6.2",
  general: {
    app_name: "",
    package_full_name: "com.example.app",
    with_queues_nb: WithQueuesNbEnum.NUMBER_0,
    with_snapstart: true,
    custom_java_env_vars: {},
    custom_java_deps: [],
    custom_java_repositories: [],
  },
  integration: {
    with_sonar: false,
    with_codeql: false,
    with_sentry: false,
    with_swagger_ui: false,
    with_file_storage: false,
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
    ...NO_AURORA_CONF,
  },
  gen_api_client: {
    ts_client_default_openapi_server_url: null,
    ts_client_api_url_env_var_name: null,
    ...NO_PUBLISH_CLIENT_CONF,
  },
  concurrency: NO_CONCURRENCY_CONF,
  compute: {
    frontal_memory: 512,
    frontal_function_timeout: 30,
    ...QUEUE0_COMPUTE_WORKER_CONF,
  },
};
