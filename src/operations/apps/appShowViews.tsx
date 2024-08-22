import {
  AppEnvironmentCreate,
  AppEnvironmentCreation,
  AppEnvironmentDiff,
  AppEnvironmentList,
  AppEnvironmentShow,
  AppEnvironmentStackEventList,
  AppEnvironmentStackList,
} from "./AppEnvironment";
import {AppDeploymentList, AppDeploymentShow} from "./AppDeployment";
import {AppLogList, AppLogShow} from "./AppLogs";
import {AppMonitoring} from "./AppMonitoring";
import {RouteMap} from "@/components/router";

export const appShowViews: RouteMap = {
  environments: {
    "$$index": <AppEnvironmentList />,
    ":envId": <AppEnvironmentShow />,
    "creation-template": <AppEnvironmentCreation />,
    "create": <AppEnvironmentCreate />,
    "diff": <AppEnvironmentDiff />,
    "stacks": <AppEnvironmentStackList />,
    ":envId/stacks/:stackId": <AppEnvironmentStackEventList />,
  },
  deployments: {
    "$$index": <AppDeploymentList />,
    ":deplId": <AppDeploymentShow />,
  },
  monitoring: <AppMonitoring />,
  logs: {
    "$$index": <AppLogList />,
    ":logId": <AppLogShow />,
  },
};
