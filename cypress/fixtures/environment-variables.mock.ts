import {preprod_env, prod_env} from "./environment.mock";

export const variables = [
  {
    id: "var1",
    name: "region",
    value: "eu-west-3",
    environment_id: prod_env.id,
    archived: false,
  },
  {
    id: "var2",
    name: "bucket-name",
    value: "poja-bucket",
    environment_id: prod_env.id,
    archived: false,
  },
  {
    id: "var3",
    name: "sentry-domain",
    value: "sentry.domain",
    environment_id: preprod_env.id,
    archived: false,
  },
];
