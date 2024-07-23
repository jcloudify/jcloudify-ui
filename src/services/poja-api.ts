import {
  HealthApi,
  SecurityApi,
  UserApi,
  ApplicationApi,
  UserRoleEnum,
  EnvironmentType,
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
  const _ = await execute();
  return _.data;
};

// TODO: naming
export const userRoles = getEnumValues(UserRoleEnum);
export const ENVIRONMENT_TYPES = getEnumValues(EnvironmentType);
