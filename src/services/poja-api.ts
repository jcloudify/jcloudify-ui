import {
  HealthApi,
  SecurityApi,
  UserApi,
  ApplicationApi,
  EnvironmentApi,
  Token as ApiToken,
} from "@jcloudify-api/typescript-client";

// TODO: impl auth configurations
export const healthApi = () => new HealthApi();
export const securityApi = () => new SecurityApi();
export const userApi = () => new UserApi();
export const applicationApi = () => new ApplicationApi();
export const environmentApi = () => new EnvironmentApi();

/* typings */
export type Token = ApiToken & {id?: string};
