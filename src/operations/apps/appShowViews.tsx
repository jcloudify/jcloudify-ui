import {
  AppEnvironmentCreate,
  AppEnvironmentCreation,
  AppEnvironmentDiff,
  AppEnvironmentList,
  AppEnvironmentShow,
  AppEnvironmentStackList,
} from "./AppEnvironment";
import {RouteMap} from "@/components/router";
import {stackShowViews} from "@/operations/stacks";

export const appShowViews: RouteMap = {
  environments: {
    "$$index": <AppEnvironmentList />,
    ":envId": <AppEnvironmentShow />,
    "creation-template": <AppEnvironmentCreation />,
    "create": <AppEnvironmentCreate />,
    "diff": <AppEnvironmentDiff />,
  },
  deployments: {
    "$$index": <AppEnvironmentStackList />,
    "environments/:envId/stacks/:stackId": stackShowViews,
  },
};
