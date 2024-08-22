import {Stack, StackType} from "@jcloudify-api/typescript-client";
import {nanoid} from "nanoid";
import {app1} from "./application.mock";
import {preprod_env, prod_env} from "./environment.mock";
import {ToRecord} from "../../src/providers";
import {getEnumValues} from "../../src/utils/enum";
import {snakeToKebab} from "../../src/utils/str";

export const app1_prod_stacks: ToRecord<Stack>[] = getEnumValues(StackType).map(
  (stack_type) => ({
    id: `app1-prod-${stack_type}-stack`,
    name: `${app1.name}-prod-${snakeToKebab(stack_type).toLowerCase()}`,
    cf_stack_id: nanoid(),
    creation_datetime: new Date("2024-07-25T05:12:58.615Z"),
    update_datetime: new Date("2024-07-25T05:12:58.615Z"),
    application: app1,
    environment: prod_env,
    stack_type,
  })
);

export const app1_preprod_stacks: ToRecord<Stack>[] = getEnumValues(
  StackType
).map((stack_type) => ({
  id: `app1-preprod-${stack_type}-stack`,
  name: `${app1.name}-preprod-${snakeToKebab(stack_type).toLowerCase()}`,
  cf_stack_id: nanoid(),
  creation_datetime: new Date("2024-07-25T05:12:58.615Z"),
  update_datetime: new Date("2024-07-25T05:12:58.615Z"),
  application: app1,
  environment: preprod_env,
  stack_type,
}));

export const stacks = {
  [app1.id]: {
    [prod_env.id]: app1_prod_stacks,
    [preprod_env.id]: app1_preprod_stacks,
  },
};
