import {DeploymentState, DeploymentStateEnum} from "@jcloudify-api/typescript-client";
import {nanoid} from "nanoid";

const chainedStateFromStateArray = (states: DeploymentStateEnum[]) => {
  const deploymentState: DeploymentState = {
    id: nanoid(),
    executionType: "ASYNCHRONOUS",
    progressionStatus: states.shift(),
  };
  let current = deploymentState;
  while (states.length) {
    const nextState: DeploymentState = {
      id: nanoid(),
      progressionStatus: states.shift(),
      executionType: "ASYNCHRONOUS",
      nextState: undefined,
    }
    current.nextState = nextState;
    current = nextState;
  }
  return deploymentState;
}

export const templateCheck_inProgress = chainedStateFromStateArray([DeploymentStateEnum.TEMPLATE_FILE_CHECK_IN_PROGRESS]);
export const provision_inProgress = chainedStateFromStateArray([
  DeploymentStateEnum.TEMPLATE_FILE_CHECK_IN_PROGRESS,
  DeploymentStateEnum.INDEPENDENT_STACKS_DEPLOYMENT_INITIATED,
]);
export const deploy_inProgress = chainedStateFromStateArray([
  DeploymentStateEnum.TEMPLATE_FILE_CHECK_IN_PROGRESS,
  DeploymentStateEnum.INDEPENDENT_STACKS_DEPLOYMENT_INITIATED,
  DeploymentStateEnum.INDEPENDENT_STACKS_DEPLOYMENT_IN_PROGRESS,
  DeploymentStateEnum.INDEPENDENT_STACKS_DEPLOYED,
  DeploymentStateEnum.COMPUTE_STACK_DEPLOYMENT_IN_PROGRESS,
]);
export const deploy_complete = chainedStateFromStateArray([
  DeploymentStateEnum.TEMPLATE_FILE_CHECK_IN_PROGRESS,
  DeploymentStateEnum.INDEPENDENT_STACKS_DEPLOYMENT_INITIATED,
  DeploymentStateEnum.INDEPENDENT_STACKS_DEPLOYMENT_IN_PROGRESS,
  DeploymentStateEnum.INDEPENDENT_STACKS_DEPLOYED,
  DeploymentStateEnum.COMPUTE_STACK_DEPLOYMENT_IN_PROGRESS,
  DeploymentStateEnum.COMPUTE_STACK_DEPLOYED,
]);
export const templateCheck_failed = chainedStateFromStateArray([
  DeploymentStateEnum.TEMPLATE_FILE_CHECK_IN_PROGRESS,
  DeploymentStateEnum.TEMPLATE_FILE_CHECK_FAILED,
]);
export const provision_failed = chainedStateFromStateArray([
    DeploymentStateEnum.TEMPLATE_FILE_CHECK_IN_PROGRESS,
    DeploymentStateEnum.INDEPENDENT_STACKS_DEPLOYMENT_INITIATED,
    DeploymentStateEnum.INDEPENDENT_STACKS_DEPLOYMENT_IN_PROGRESS,
    DeploymentStateEnum.INDEPENDENT_STACKS_DEPLOYED,
    DeploymentStateEnum.INDEPENDENT_STACKS_DEPLOYMENT_FAILED,
]);

export const deploy_failed = chainedStateFromStateArray([
    DeploymentStateEnum.TEMPLATE_FILE_CHECK_IN_PROGRESS,
    DeploymentStateEnum.INDEPENDENT_STACKS_DEPLOYMENT_INITIATED,
    DeploymentStateEnum.INDEPENDENT_STACKS_DEPLOYMENT_IN_PROGRESS,
    DeploymentStateEnum.INDEPENDENT_STACKS_DEPLOYED,
    DeploymentStateEnum.COMPUTE_STACK_DEPLOYMENT_IN_PROGRESS,
    DeploymentStateEnum.COMPUTE_STACK_DEPLOYMENT_FAILED
]);
