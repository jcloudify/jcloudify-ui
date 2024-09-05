import {nanoid} from "nanoid";
import {prod_env} from "./environment.mock";

export const app1_prod_env_compute_stack_resources = [
  {
    id: nanoid(),
    environment_id: prod_env.id,
    frontal_function_name:
      "prod-compute-jcloudify-void-FrontalFunction-JosBWwKstZzU",
    worker_1_function_name:
      "prod-compute-jcloudify-void-WorkerFunction1-a5ukAGXgvw9k",
    worker_2_function_name:
      "prod-compute-jcloudify-void-WorkerFunction2-P9gk3TaJY4mm",
    creation_datetime: "2024-09-05T07:57:11.923833Z",
  },
];
