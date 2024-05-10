import {faker as m} from "@faker-js/faker/locale/en";

const app = () => ({
  name: m.company.name(),
  deployed_url: m.internet.url(),
  archived: false,
  state: m.helpers.arrayElement(["ACTIVE", "INACTIVE"]),
  github_repository: "https://github.com/poja-app/".concat(m.git.branch()),
  creation_datetime: m.date.recent(),
});

export const app1 = {
  id: "app1",
  ...app(),
};

export const app2 = {
  id: "app2",
  ...app(),
};

export const app3 = {
  id: "app3",
  ...app(),
};

export const app4 = {
  id: "app4",
  ...app(),
};

export const apps = [app1, app2, app3, app4];
