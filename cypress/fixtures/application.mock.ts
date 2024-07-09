import {ToRecord} from "@/providers";
import {faker as m} from "@faker-js/faker/locale/en";
import {user1} from "./user.mock";
import {preprod_env, preprod_env2, prod_env} from "./environment.mock";
import {TODO_Application} from "@/services/poja-api";

const app = (id: string): ToRecord<TODO_Application> => ({
  id,
  name: "jcloudify-" + id,
  archived: false,
  github_repository: "https://github.com/poja-app/jcloudify-api-" + id,
  creation_datetime: m.date.recent(),
  user_id: user1.id!,
  metadata: {
    ses_source: "noreply@nowhere.com",
    with_swagger_ui: false,
    package_full_name: "school.hei",
    custom_java_repositories: "string" as any,
    custom_java_deps: "string" as any,
    custom_java_env_vars: "string" as any,
    java_facade_it: "FacadeIT",
    with_gen_clients: false,
    with_database: "sqlite",
    jacoco_min_coverage: 0.8,
    with_publish_to_npm_registry: false,
    ts_client_default_openapi_server_url: "string",
    ts_client_api_url_env_var_name: "string",
    frontal_memory: 2048,
    worker_memory: 1024,
    worker_batch: 5,
    with_snapstart: false,
    database_non_root_username: "string",
    database_non_root_password: "string",
    with_sentry: false,
    with_sonar: false,
    with_codeql: false,
    app_name: "poja-sqlite",
    frontal_reserved_concurrent_executions_nb: "string",
    worker_reserved_concurrent_executions_nb: "string",
    aurora_min_capacity: 0,
    aurora_max_capacity: 0,
    aurora_scale_point: 0,
    aurora_sleep: 300,
    aurora_auto_pause: false,
    prod_db_cluster_timeout: 300,
  },
  environments: [],
});

export const app1 = {
  ...app("app1"),
  environments: [prod_env, preprod_env],
};

export const app2 = {
  ...app("app2"),
  environments: [preprod_env2],
};

export const app3 = {
  ...app("app3"),
  id: "app3",
};

export const app4 = {
  ...app("app4"),
  id: "app4",
};

export const apps = [app1, app2, app3, app4];
