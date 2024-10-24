import {
  Application,
  Environment,
  EnvironmentType,
  StackEvent,
  StackOutput,
  StackType,
} from "@jcloudify-api/typescript-client";
import {nanoid} from "nanoid";
import {app1, app2} from "./application.mock";
import {preprod_env, preprod_env2, prod_env} from "./environment.mock";
import {getEnumValues} from "../../src/utils/enum";
import {snakeToKebab} from "../../src/utils/str";

const makeStacks = (app: Application, env: Environment) =>
  getEnumValues(StackType).map((stack_type) => ({
    id: `${app.id}-${env.environment_type!.toLowerCase()}-${stack_type}-stack`,
    name: `${app.name}-prod-${snakeToKebab(stack_type).toLowerCase()}`,
    cf_stack_id: nanoid(),
    creation_datetime: new Date("2024-07-25T05:12:58.615Z"),
    update_datetime: new Date("2024-07-25T05:12:58.615Z"),
    application: app1,
    environment: env,
    stack_type,
  }));

export const app1_prod_stacks = makeStacks(app1, prod_env);
export const app1_preprod_stacks = makeStacks(app1, preprod_env);
export const app2_preprod_stacks = makeStacks(app2, preprod_env2);
export const app2_prod_stacks = makeStacks(app2, {
  ...preprod_env2,
  environment_type: EnvironmentType.PROD,
});

export const stack_events: StackEvent[] = [
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

export const stack_outputs_with_apiUrl: StackOutput[] = [
  {
    key: "ApiUrl",
    value: "https://nsqk8hbcv.execute-api.eu-west-3.amazonaws.com/Prod",
    description: "API Gateway endpoint URL",
  },
];

export const stack_outputs_without_apiUrl: StackOutput[] = [
  {
    key: "ELB-VPCID",
    value: "a-vpcid",
    description: "The ID of the VPC",
  },
];
