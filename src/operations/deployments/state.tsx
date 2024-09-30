import {
  MdCheckCircleOutline,
  MdOutlinePending,
  MdOutlineAccessTime,
  MdOutlineHighlightOff,
} from "react-icons/md";
import {DeploymentState} from "@jcloudify-api/typescript-client";

// The last state serves as a transition between two checkpoint
const STATE_CHECKPOINTS = [
  {
    label: "Initialize",
    states: [
      "TEMPLATE_FILE_CHECK_IN_PROGRESS",
      "INDEPENDENT_STACKS_DEPLOYMENT_INITIATED",
    ],
    failedState: "TEMPLATE_FILE_CHECK_FAILED",
  },
  {
    label: "Prepare",
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
];

export interface DeploymentCheckpoint {
  label: string;
  status: keyof typeof Status;
}

export const Status = {
  COMPLETED: "COMPLETED",
  IN_PROGRESS: "IN_PROGRESS",
  FAILED: "FAILED",
  PENDING: "PENDING",
} as const;

export const STATUS_COLORS = {
  [Status.COMPLETED]: "green",
  [Status.IN_PROGRESS]: "orange",
  [Status.FAILED]: "red",
  [Status.PENDING]: "gray",
} as const;

export const STATUS_ICON_COMPONENTS = {
  [Status.COMPLETED]: MdCheckCircleOutline,
  [Status.IN_PROGRESS]: MdOutlinePending,
  [Status.FAILED]: MdOutlineHighlightOff,
  [Status.PENDING]: MdOutlineAccessTime,
};

export const mapStateToCheckpoint = (states: string[]) => {
  return STATE_CHECKPOINTS.map((checkpoint) => {
    if (states.includes(checkpoint.failedState)) {
      return {label: checkpoint.label, status: Status.FAILED};
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
        status: isInProgress ? Status.IN_PROGRESS : Status.COMPLETED,
      };
    }
    return {label: checkpoint.label, status: Status.PENDING};
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
