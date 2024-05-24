import {
  HealthApi,
  SecurityApi,
  UserApi,
  ApplicationApi,
  EnvironmentApi,
  Token as ApiToken,
} from "@jcloudify-api/typescript-client";
import {authProvider} from "@/providers";

// TODO: impl auth configurations
export const healthApi = () => new HealthApi(authProvider.getCachedAuthConf());
export const securityApi = () =>
  new SecurityApi(authProvider.getCachedAuthConf());
export const userApi = () => new UserApi(authProvider.getCachedAuthConf());
export const applicationApi = () =>
  new ApplicationApi(authProvider.getCachedAuthConf());
export const environmentApi = () =>
  new EnvironmentApi(authProvider.getCachedAuthConf());

/* spec wrong typings */
export type Token = {
  id?: string;
  data: ApiToken;
};
