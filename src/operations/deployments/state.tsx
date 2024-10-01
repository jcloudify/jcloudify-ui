import {
  MdCheckCircleOutline,
  MdOutlinePending,
  MdOutlineAccessTime,
  MdOutlineHighlightOff,
} from "react-icons/md";
import {DeploymentState} from "@jcloudify-api/typescript-client";

export interface CheckpointProgress {
  label: string;
  status: keyof typeof STATUS;
}

// The last state serves as a transition between two checkpoint
const STATE_CHECKPOINTS = [
  {
    label: "Template check",
    states: [
      "TEMPLATE_FILE_CHECK_IN_PROGRESS",
      "INDEPENDENT_STACKS_DEPLOYMENT_INITIATED",
    ],
    failedState: "TEMPLATE_FILE_CHECK_FAILED",
  },
  {
    label: "Provision",
    states: [
      "INDEPENDENT_STACKS_DEPLOYMENT_INITIATED",
      "INDEPENDENT_STACKS_DEPLOYMENT_IN_PROGRESS",
      "INDEPENDENT_STACKS_DEPLOYED",
      "COMPUTE_STACK_DEPLOYMENT_IN_PROGRESS",
    ],
    failedState: "INDEPENDENT_STACKS_DEPLOYMENT_FAILED",
  },
  {
    label: "Deploy",
    states: ["COMPUTE_STACK_DEPLOYMENT_IN_PROGRESS", "COMPUTE_STACK_DEPLOYED"],
    failedState: "COMPUTE_STACK_DEPLOYMENT_FAILED",
  },
] as const;

export const STATUS = {
  COMPLETED: "COMPLETED",
  IN_PROGRESS: "IN_PROGRESS",
  FAILED: "FAILED",
  PENDING: "PENDING",
} as const;

export const STATUS_COLORS = {
  [STATUS.COMPLETED]: "green",
  [STATUS.IN_PROGRESS]: "orange",
  [STATUS.FAILED]: "red",
  [STATUS.PENDING]: "gray",
} as const;

export const STATUS_ICONS = {
  [STATUS.COMPLETED]: MdCheckCircleOutline,
  [STATUS.IN_PROGRESS]: MdOutlinePending,
  [STATUS.FAILED]: MdOutlineHighlightOff,
  [STATUS.PENDING]: MdOutlineAccessTime,
};

export const mapStateToCheckpoint = (states: string[]) => {
  return STATE_CHECKPOINTS.map((checkpoint) => {
    if (states.includes(checkpoint.failedState)) {
      return {label: checkpoint.label, status: STATUS.FAILED};
    } else if (
      checkpoint.states.some((checkpointState) =>
        states.includes(checkpointState)
      )
    ) {
      const isInProgress = !states.includes(
        checkpoint.states[checkpoint.states.length - 1]
      );
      return {
        label: checkpoint.label,
        status: isInProgress ? STATUS.IN_PROGRESS : STATUS.COMPLETED,
      };
    }
    return {label: checkpoint.label, status: STATUS.PENDING};
  });
};

export const flattenDeploymentState = (deploymentState: DeploymentState) => {
  const states = [];
  for (let state = deploymentState; state != null; state = state.nextState!) {
    const {nextState: _next, ...aState} = state;
    states.push(aState);
  }
  return states;
};
