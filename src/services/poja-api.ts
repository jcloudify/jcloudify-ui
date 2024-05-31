import {
  HealthApi,
  SecurityApi,
  UserApi,
  ApplicationApi,
  EnvironmentApi,
  Token as ApiToken,
  UserRoleEnum,
} from "@jcloudify-api/typescript-client";
import {AxiosResponse} from "axios";
import {authProvider} from "@/providers";
import {getEnumValues} from "@/utils/enum";

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

export type UnwrapResult<TReturn extends () => Promise<AxiosResponse<any>>> =
  TReturn extends () => Promise<AxiosResponse<infer Res>> ? Res : never;

export const unwrap = async <Fn extends () => Promise<AxiosResponse<any>>>(
  execute: Fn
): Promise<UnwrapResult<Fn>> => {
  const _ = await execute();
  return _.data;
};

export const userRoles = getEnumValues(UserRoleEnum);
