import {faker as m} from "@faker-js/faker/locale/en";

const app = (id: string) => ({
  id,
  name: "jcloudify-" + id,
  deployed_url: "jcloudify-" + id + ".app",
  archived: false,
  github_repository: "https://github.com/poja-app/jcloudify-api-" + id,
  creation_datetime: m.date.recent(),
});

export const app1 = {
  ...app("app1"),
  state: "HEALTHY",
};

export const app2 = {
  ...app("app2"),
  state: "UNHEALTHY",
};

export const app3 = {
  ...app("app3"),
  id: "app3",
  state: "UNHEALTHY",
};

export const app4 = {
  ...app("app4"),
  id: "app4",
  state: "HEALTHY",
};

export const apps = [app1, app2, app3, app4];
