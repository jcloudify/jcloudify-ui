import {app1, app2} from "./application.mock";

// app1 envs
const prod_env = {
  id: "prod_env",
  environment_type: "PROD",
  application_id: app1.id,
};

const preprod_env = {
  id: "preprod_env",
  environment_type: "PREPROD",
  application_id: app1.id,
};

const preprod_env2 = {
  id: "preprod_env2",
  environment_type: "PREPROD",
  application_id: app2.id,
};

export const envs = [prod_env, preprod_env, preprod_env2];
