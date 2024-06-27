import {ToRecord} from "@/providers";
import {
  Environment,
  EnvironmentType,
  EnvironmentStateEnum,
  PojaMetadata,
  Plan,
} from "@jcloudify-api/typescript-client";

// app1 envs
export const prod_env: ToRecord<Environment> = {
  id: "prod_env",
  environment_type: EnvironmentType.PROD,
  state: EnvironmentStateEnum.HEALTHY,
  archived: false,
  metadata: {} as PojaMetadata,
  plan: {} as Plan,
};

export const preprod_env: ToRecord<Environment> = {
  id: "preprod_env",
  environment_type: EnvironmentType.PREPROD,
  state: EnvironmentStateEnum.HEALTHY,
  archived: false,
  metadata: {} as PojaMetadata,
  plan: {} as Plan,
};

export const preprod_env2: ToRecord<Environment> = {
  id: "preprod_env2",
  environment_type: EnvironmentType.PREPROD,
  state: EnvironmentStateEnum.UNHEALTHY,
  archived: false,
  metadata: {} as PojaMetadata,
  plan: {} as Plan,
};

export const envs = [prod_env, preprod_env, preprod_env2];
