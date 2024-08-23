import {
  Stack,
  StackEvent,
  StackOutput,
  StackType,
} from "@jcloudify-api/typescript-client";
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

export const app1_prod_stack_events: StackEvent[] = [
  {
    event_id: "39166810-6073-11ef-ad18-0a78309a1bb3",
    logical_resource_id: "prod-compute-permission-jcloudify-cloudy",
    resource_type: "AWS::CloudFormation::Stack",
    timestamp: new Date("2024-08-22T10:42:26.688Z"),
    resource_status: "CREATE_COMPLETE",
    status_message: "",
  },
  {
    event_id: "ExecutionRoleArnSSM-CREATE_COMPLETE-2024-08-22T10:42:25.916Z",
    logical_resource_id: "ExecutionRoleArnSSM",
    resource_type: "AWS::SSM::Parameter",
    timestamp: new Date("2024-08-22T10:42:25.916Z"),
    resource_status: "CREATE_COMPLETE",
    status_message: "",
  },
  {
    event_id: "ExecutionRoleArnSSM-CREATE_IN_PROGRESS-2024-08-22T10:42:25.591Z",
    logical_resource_id: "ExecutionRoleArnSSM",
    resource_type: "AWS::SSM::Parameter",
    timestamp: new Date("2024-08-22T10:42:25.591Z"),
    resource_status: "CREATE_IN_PROGRESS",
    status_message: "Resource creation Initiated",
  },
  {
    event_id: "ExecutionRoleArnSSM-CREATE_IN_PROGRESS-2024-08-22T10:42:24.680Z",
    logical_resource_id: "ExecutionRoleArnSSM",
    resource_type: "AWS::SSM::Parameter",
    timestamp: new Date("2024-08-22T10:42:24.680Z"),
    resource_status: "CREATE_IN_PROGRESS",
    status_message: "",
  },
  {
    event_id: "ExecutionRole-CREATE_COMPLETE-2024-08-22T10:42:23.619Z",
    logical_resource_id: "ExecutionRole",
    resource_type: "AWS::IAM::Role",
    timestamp: new Date("2024-08-22T10:42:23.619Z"),
    resource_status: "CREATE_COMPLETE",
    status_message: "",
  },
  {
    event_id: "ExecutionRole-CREATE_IN_PROGRESS-2024-08-22T10:42:05.872Z",
    logical_resource_id: "ExecutionRole",
    resource_type: "AWS::IAM::Role",
    timestamp: new Date("2024-08-22T10:42:05.872Z"),
    resource_status: "CREATE_IN_PROGRESS",
    status_message: "Resource creation Initiated",
  },
  {
    event_id: "ExecutionRole-CREATE_IN_PROGRESS-2024-08-22T10:42:04.781Z",
    logical_resource_id: "ExecutionRole",
    resource_type: "AWS::IAM::Role",
    timestamp: new Date("2024-08-22T10:42:04.781Z"),
    resource_status: "CREATE_IN_PROGRESS",
    status_message: "",
  },
];

export const app1_prod_stack_outputs: StackOutput[] = [
  {
    key: "ApiUrl",
    value: "https://nsqk8hbcv.execute-api.eu-west-3.amazonaws.com/Prod",
    description: "API Gateway endpoint URL",
  },
  {
    key: "ELB-VPCID",
    value: "a-vpcid",
    description: "The ID of the VPC",
  },
];
