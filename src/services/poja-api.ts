import {
  HealthApi,
  SecurityApi,
  UserApi,
  ApplicationApi,
  EnvironmentApi,
  Token as ApiToken,
} from "@jcloudify-api/typescript-client";
import {AxiosResponse} from "axios";
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

/* unwrap response */

export type UnwrapResponse<TReturn extends Promise<AxiosResponse<any>>> =
  TReturn extends Promise<AxiosResponse<infer TData>> ? TData : never;

export const unwrap = async <TReturn extends Promise<AxiosResponse<any>>>(
  re: () => TReturn
) => {
  const _ = await re();
  return _.data;
};
