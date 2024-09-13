import {user1} from "./user.mock";
import {preprod_env, preprod_env2, prod_env} from "./environment.mock";
import {nanoid} from "nanoid";
import {app1, app2} from "./application.mock";
import {AppEnvDeployment} from "@jcloudify-api/typescript-client";
import {ToRecord} from "../../src/providers";

export const depl1: ToRecord<AppEnvDeployment> = {
  id: "depl1",
  github_meta: {
    commit_author_name: user1.username!,
    commit_message: "poja: bootstrap",
    commit_sha: "fdf8268c7b3ecef9ae7298ef4acaeca38cf9d2ef",
    commit_branch: "prod",
    org: user1.username!,
    repo_url: `https://github.com/${user1.username}/poja-app`,
    repo_name: "poja-app",
    repo_owner_type: "User",
    repo_id: nanoid(),
    is_repo_private: false,
  },
  creator: {
    email: user1.email!,
    username: user1.username!,
    avatar_url: user1.avatar!,
    github_id: user1.github_id!,
  },
  application_id: app1.id,
  environment_id: prod_env.id,
  deployed_url: "https://eckdial6c4.execute-api.eu-west-3.amazonaws.com/Prod",
  creation_datetime: new Date(2024, 0, 2),
};

export const depl2: ToRecord<AppEnvDeployment> = {
  id: "depl2",
  creator: {
    email: user1.email!,
    username: user1.username!,
    avatar_url: user1.avatar!,
    github_id: user1.github_id!,
  },
  github_meta: {
    commit_author_name: user1.username!,
    commit_message: "feat: deployment",
    commit_sha: "fdf8268c7b3ecef9ae7298ef4acaeca38cf9d2ef",
    commit_branch: "preprod",
    org: user1.username!,
    repo_url: `https://github.com/${user1.username}/poja-app`,
    repo_name: "poja-app",
    repo_owner_type: "User",
    repo_id: nanoid(),
    is_repo_private: false,
  },
  application_id: app1.id,
  environment_id: preprod_env.id,
  deployed_url: "https://eckdial6c4.execute-api.eu-west-3.amazonaws.com/Prod",
  creation_datetime: new Date(2024, 0, 4),
};

export const depl3: ToRecord<AppEnvDeployment> = {
  id: "depl3",
  creator: {
    email: user1.email!,
    username: user1.username!,
    avatar_url: user1.avatar!,
    github_id: user1.github_id!,
  },
  github_meta: {
    commit_author_name: user1.username!,
    commit_message: "feat: deployment",
    commit_sha: "fdf8268c7b3ecef9ae7298ef4acaeca38cf9dkkd",
    commit_branch: "preprod",
    org: user1.username!,
    repo_url: `https://github.com/${user1.username}/poja-app`,
    repo_name: "poja-app",
    repo_owner_type: "User",
    repo_id: nanoid(),
    is_repo_private: false,
  },
  application_id: app2.id,
  environment_id: preprod_env2.id,
  deployed_url: "https://eckdial6c4.execute-api.eu-west-3.amazonaws.com/Prod",
  creation_datetime: new Date(2024, 0, 10),
};

export const depls = [depl1, depl2, depl3];
