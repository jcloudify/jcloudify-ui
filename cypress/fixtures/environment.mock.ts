import {ToRecord} from "@/providers";
import {Environment, EnvironmentType} from "@jcloudify-api/typescript-client";

// app1 envs
export const prod_env: ToRecord<Environment> = {
  id: "prod_env",
  environment_type: EnvironmentType.PROD,
  archived: false,
};

export const preprod_env: ToRecord<Environment> = {
  id: "preprod_env",
  environment_type: EnvironmentType.PREPROD,
  archived: false,
};

export const preprod_env2: ToRecord<Environment> = {
  id: "preprod_env2",
  environment_type: EnvironmentType.PREPROD,
  archived: false,
};

export const envs = [prod_env, preprod_env, preprod_env2];

export const app1_envs = [prod_env, preprod_env];
export const app2_envs = [preprod_env2];
