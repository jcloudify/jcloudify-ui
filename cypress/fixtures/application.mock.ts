import {
  Application,
  ApplicationStateEnum,
} from "@jcloudify-api/typescript-client";
import {faker as m} from "@faker-js/faker/locale/en";

const app = (id: string): Required<Application> => ({
  id,
  name: "jcloudify-" + id,
  archived: false,
  github_repository: "https://github.com/poja-app/jcloudify-api-" + id,
  state: ApplicationStateEnum.HEALTHY,
  creation_datetime: m.date.recent(),
});

export const app1 = {
  ...app("app1"),
  state: ApplicationStateEnum.HEALTHY,
};

export const app2 = {
  ...app("app2"),
  state: ApplicationStateEnum.UNHEALTHY,
};

export const app3 = {
  ...app("app3"),
  id: "app3",
  state: ApplicationStateEnum.UNHEALTHY,
};

export const app4 = {
  ...app("app4"),
  id: "app4",
  state: ApplicationStateEnum.UNHEALTHY,
};

export const apps: Required<Application>[] = [app1, app2, app3, app4];
