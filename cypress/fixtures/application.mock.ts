import {Application} from "@jcloudify-api/typescript-client";
import {faker as m} from "@faker-js/faker/locale/en";
import {user1} from "./user.mock";

const app = (id: string): Required<Application> => ({
  id,
  name: "jcloudify-" + id,
  archived: false,
  github_repository: "https://github.com/poja-app/jcloudify-api-" + id,
  creation_datetime: m.date.recent(),
  user_id: user1.id!,
  environments: [],
});

export const app1 = {
  ...app("app1"),
};

export const app2 = {
  ...app("app2"),
};

export const app3 = {
  ...app("app3"),
  id: "app3",
};

export const app4 = {
  ...app("app4"),
  id: "app4",
};

export const apps: Required<Application>[] = [app1, app2, app3, app4];
