import {faker as m} from "@faker-js/faker/locale/en";
import {Application, PojaConf1} from "@jcloudify-api/typescript-client";
import {app1} from "./application.mock";

const createConf1 = (
  app: Application,
  env_vars: Record<string, string>
): PojaConf1 => ({
  version: "string",
  general: {
    app_name: "string",
    with_snapstart: true,
    with_queues_nb: 0,
    package_full_name: "string",
    custom_java_repositories: ["mavenLocal", "gradleLocal"],
    custom_java_deps: ["lombok", "tika", "guava"],
    custom_java_env_vars: env_vars,
  },
  integration: {
    with_sentry: false,
    with_sonar: false,
    with_codeql: false,
    with_file_storage: false,
    with_swagger_ui: false,
  },
  gen_api_client: {
    aws_account_id: m.string.numeric({length: 12}),
    with_publish_to_npm_registry: true,
    ts_client_default_openapi_server_url: `https://${app.name}.com`,
    ts_client_api_url_env_var_name: "JCLOUDIFY_API_URL",
    codeartifact_repository_name: `${app.name}-store`,
    codeartifact_domain_name: `npm-${app.name}-app`,
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
    with_database: "NONE",
    database_non_root_username: "string",
    database_non_root_password: "string",
    prod_db_cluster_timeout: 300,
    aurora_min_capacity: 0,
    aurora_max_capacity: 0,
    aurora_scale_point: 0,
    aurora_sleep: 300,
    aurora_auto_pause: false,
  },
});

export const prod_env_conf1 = createConf1(app1, {
  "region": "eu-west-3",
  "bucket-name": "poja-bucket",
});

export const preprod_env_conf1 = createConf1(app1, {
  "sentry-domain": "sentry.domain",
});
