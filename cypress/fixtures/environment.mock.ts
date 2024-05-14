import {app1} from "./application.mock";

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

export const envs = [prod_env, preprod_env];
