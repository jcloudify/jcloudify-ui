import {
  HealthApi,
  SecurityApi,
  UserApi,
  ApplicationApi,
  UserRoleEnum,
  EnvironmentType,
  StackApi,
  EnvironmentApi,
  GithubAppInstallationApi,
} from "@jcloudify-api/typescript-client";
import {AxiosError, AxiosResponse, isAxiosError} from "axios";
import {authProvider} from "@/providers";
import {getEnumValues} from "@/utils/enum";
import {extractApiError, getErrorMessage} from "@/utils/axios";

// TODO: impl auth configurations
export const healthApi = () => new HealthApi(authProvider.getCachedAuthConf());
export const securityApi = () =>
  new SecurityApi(authProvider.getCachedAuthConf());
export const userApi = () => new UserApi(authProvider.getCachedAuthConf());
export const applicationApi = () =>
  new ApplicationApi(authProvider.getCachedAuthConf());
export const environmentApi = () =>
  new EnvironmentApi(authProvider.getCachedAuthConf());
export const stackApi = () => new StackApi(authProvider.getCachedAuthConf());
export const githubAppInstallationApi = () =>
  new GithubAppInstallationApi(authProvider.getCachedAuthConf());

export interface TODO_Deployment {
  id: string;
  createdAt: Date;
  creator: {
    email: string;
    username: string;
    github_id: string;
    avatar: string;
  };
  application_id: string;
  target_env_type: EnvironmentType;
  state: "READY" | "IN_PROGRESS" | "FAILED";
  url?: string;
  github_meta: {
    commit_branch: string;
    commit_author_name: string;
    commit_message: string;
    commit_org: string;
    commit_repo: string;
    commit_sha: string;
    commit_repo_id: string;
    org: string;
    repo: string;
    repo_owner_type: string;
    repo_id: string;
    repo_visibility: string;
  };
}

export enum TODO_DeploymentStateEnum {
  READY = "Ready",
  IN_PROGRESS = "In Progress",
  FAILED = "Failed",
}

/* unwrap response */
export type UnwrapResult<TReturn extends () => Promise<AxiosResponse<any>>> =
  TReturn extends () => Promise<AxiosResponse<infer Res>> ? Res : never;

export const unwrap = async <Fn extends () => Promise<AxiosResponse<any>>>(
  execute: Fn
): Promise<UnwrapResult<Fn>> => {
  let response = {} as Promise<UnwrapResult<Fn>>;
  try {
    response = (await execute()).data;
  } catch (error) {
    console.log("error", error);
    console.log("api_error", extractApiError(error));
    console.log("api_error", getErrorMessage(error as any));
    throw extractApiError(error);
  }
  return response;
};

// TODO: naming
export const userRoles = getEnumValues(UserRoleEnum);
export const ENVIRONMENT_TYPES = getEnumValues(EnvironmentType);
