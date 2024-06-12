import {faker as m} from "@faker-js/faker/locale/en";
import {TODO_Deployment} from "@/services/poja-api";
import {user1} from "./user.mock";
import {preprod_env, preprod_env2, prod_env} from "./environment.mock";
import {nanoid} from "nanoid";
import {app1, app2} from "./application.mock";

export const depl1: TODO_Deployment = {
  id: "depl1",
  createdAt: m.date.recent(),
  creator: {
    email: user1.email!,
    username: user1.username!,
    avatar: user1.avatar!,
    github_id: user1.github_id!,
  },
  application_id: app1.id,
  target_env_type: prod_env.environment_type,
  state: "READY",
  url: "https://eckdial6c4.execute-api.eu-west-3.amazonaws.com/Prod",
  github_meta: {
    commit_author_name: user1.username!,
    commit_message: "poja: bootstrap",
    commit_org: user1.username!,
    commit_repo: "poja-app",
    commit_sha: "fdf8268c7b3ecef9ae7298ef4acaeca38cf9d2ef",
    commit_repo_id: nanoid(),
    commit_branch: "prod",
    org: user1.username!,
    repo: "poja-app",
    repo_owner_type: "User",
    repo_id: nanoid(),
    repo_visibility: "Public",
  },
};

export const depl2: TODO_Deployment = {
  id: "depl2",
  createdAt: m.date.recent(),
  creator: {
    email: user1.email!,
    username: user1.username!,
    avatar: user1.avatar!,
    github_id: user1.github_id!,
  },
  application_id: app1.id,
  target_env_type: preprod_env.environment_type,
  state: "IN_PROGRESS",
  github_meta: {
    commit_author_name: user1.username!,
    commit_message: "style: reformat",
    commit_org: user1.username!,
    commit_repo: "poja-app",
    commit_sha: "eccf28034eafdb9774e721d122cbdf2c2bbfaed2",
    commit_repo_id: nanoid(),
    commit_branch: "preprod",
    org: user1.username!,
    repo: "poja-app",
    repo_owner_type: "User",
    repo_id: nanoid(),
    repo_visibility: "Public",
  },
};

export const depl3: TODO_Deployment = {
  id: "depl3",
  createdAt: m.date.recent(),
  creator: {
    email: user1.email!,
    username: user1.username!,
    avatar: user1.avatar!,
    github_id: user1.github_id!,
  },
  application_id: app2.id,
  target_env_type: preprod_env2.environment_type,
  state: "FAILED",
  github_meta: {
    commit_author_name: user1.username!,
    commit_message: "fixup: update ts client",
    commit_org: user1.username!,
    commit_repo: "poja-app",
    commit_sha: "569db4268dd2b94f5319b8de8107723ef6bec497",
    commit_repo_id: nanoid(),
    commit_branch: "preprod",
    org: user1.username!,
    repo: "poja-app",
    repo_owner_type: "User",
    repo_id: nanoid(),
    repo_visibility: "Public",
  },
};

export const depls = [depl1, depl2, depl3];
