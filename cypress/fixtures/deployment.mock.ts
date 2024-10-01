import {AppEnvDeployment} from "@jcloudify-api/typescript-client";
import {user1} from "./user.mock";
import {app1, app2} from "./application.mock";
import {preprod_env, prod_env} from "./environment.mock";
import {ToRecord} from "../../src/providers";

export const depl1: ToRecord<AppEnvDeployment> = {
  id: "depl1",
  github_meta: {
    commit: {
      committer: {
        name: user1.username,
        email: user1.email,
        avatar_url: user1.avatar,
        github_id: user1.github_id,
        is_jc_bot: false,
      },
      message: "poja: gen",
      sha: "fdf8268c7b3e2349ae7298ef4acaeca38cf9d2ef",
      branch: "prod",
      url: `https://github.com/jcloudify/jcloudify-ui/pull/57/commits/fdf8268c7b3e2349ae7298ef4acaeca38cf9d2ef`,
    },
    repo: {
      name: app1.github_repository?.name,
      owner_name: user1.username,
    },
  },
  application_id: app1.id,
  environment_id: prod_env.id,
  deployed_url: "https://eckdial6c4.execute-api.eu-west-3.amazonaws.com/Prod",
  creation_datetime: new Date(2024, 0, 2),
};

export const depl2: ToRecord<AppEnvDeployment> = {
  id: "depl2",
  github_meta: {
    commit: {
      committer: {
        name: user1.username,
        email: user1.email,
        avatar_url: user1.avatar,
        github_id: user1.github_id,
        is_jc_bot: false,
      },
      message: "feat: deployment list",
      sha: "fdf82639ajieuff9ae7298ef4acaeca38cf9d2ef",
      branch: "preprod",
      url: `https://github.com/jcloudify/jcloudify-ui/pull/57/commits/fdf82639ajieuff9ae7298ef4acaeca38cf9d2ef`,
    },
    repo: {
      name: app1.github_repository?.name,
      owner_name: user1.username,
    },
  },
  application_id: app1.id,
  environment_id: preprod_env.id,
  deployed_url: "https://eckdial6c4.execute-api.eu-west-3.amazonaws.com/Prod",
  creation_datetime: new Date(2024, 0, 4),
};

export const depl3: ToRecord<AppEnvDeployment> = {
  id: "depl3",
  github_meta: {
    commit: {
      committer: {
        name: user1.username,
        email: user1.email,
        avatar_url: user1.avatar,
        github_id: user1.github_id,
        is_jc_bot: false,
      },
      message: "feat: ",
      sha: "gFf8268c7b3ecef9ae7298ef4acaeca38cfE8okef",
      branch: "preprod",
      url: `https://github.com/jcloudify/jcloudify-ui/pull/57/commits/gFf8268c7b3ecef9ae7298ef4acaeca38cfE8okef`,
    },
    repo: {
      name: app2.name,
      owner_name: user1.username,
    },
  },
  application_id: app1.id,
  environment_id: preprod_env.id,
  deployed_url:
    "https://eckdial6c4.execute-api.eu-west-3.amazonaws.com/Preprod",
  creation_datetime: new Date(2024, 0, 10),
};

export const depls = [depl1, depl2, depl3];
