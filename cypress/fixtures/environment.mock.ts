import {Environment, EnvironmentType} from "@jcloudify-api/typescript-client";
import {app1, app2} from "./application.mock";

// app1 envs
export const prod_env: Required<Environment> = {
  id: "prod_env",
  environment_type: EnvironmentType.PROD,
  application_id: app1.id,
};

export const preprod_env: Required<Environment> = {
  id: "preprod_env",
  environment_type: EnvironmentType.PREPROD,
  application_id: app1.id,
};

export const preprod_env2: Required<Environment> = {
  id: "preprod_env2",
  environment_type: EnvironmentType.PREPROD,
  application_id: app2.id,
};

export const envs = [prod_env, preprod_env, preprod_env2];
