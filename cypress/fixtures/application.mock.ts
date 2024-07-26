import {Application} from "@jcloudify-api/typescript-client";
import {ToRecord} from "@/providers";
import {faker as m} from "@faker-js/faker/locale/en";
import {user1} from "./user.mock";
import {preprod_env, preprod_env2, prod_env} from "./environment.mock";

const app = (id: string): ToRecord<Application> => ({
  id,
  name: "jcloudify-" + id,
  archived: false,
  repositoryUrl: "https://github.com/poja-app/jcloudify-api-" + id,
  creation_datetime: m.date.recent(),
  user_id: user1.id!,
  environments: [],
  github_repository: {
    name: "jcloudify-" + id,
    description: "jcloudify platform " + id,
    is_private: false,
  },
});

export const app1 = {
  ...app("app1"),
  environments: [prod_env, preprod_env],
};

export const app2 = {
  ...app("app2"),
  environments: [preprod_env2],
};

export const app3 = {
  ...app("app3"),
  id: "app3",
};

export const app4 = {
  ...app("app4"),
  id: "app4",
};

export const apps = [app1, app2, app3, app4];
